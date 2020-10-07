/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { ElementVisibility } from './Types';

interface HTMLElementWithBoundingRectCacheId extends HTMLElement {
    __ahCacheId?: string;
}

interface FocusedElementWithIgnoreFlag extends HTMLElement {
    __shouldIgnoreFocus: boolean;
}

export interface WindowWithUID extends Window {
    __ahCrossOriginWindowUID?: string;
}

export interface HTMLElementWithUID extends HTMLElement {
    __ahElementUID?: string;
}

export interface CustomFocusFunctionWithOriginal {
    __ahFocus?: (options?: FocusOptions | undefined) => void;
}

export interface AHDOMRect {
    bottom: number;
    left: number;
    right: number;
    top: number;
}

let _isBrokenIE11: boolean;
let _containerBoundingRectCache: { [id: string]: { rect: AHDOMRect, element: HTMLElementWithBoundingRectCacheId } } = {};
let _lastContainerBoundingRectCacheId = 0;
let _containerBoundingRectCacheTimer: number | undefined;

const _DOMRect = typeof DOMRect !== 'undefined' ? DOMRect : class {
    readonly bottom: number;
    readonly left: number;
    readonly right: number;
    readonly top: number;

    constructor(x?: number, y?: number, width?: number, height?: number) {
        this.left = x || 0;
        this.top = y || 0;
        this.right = (x || 0) + (width || 0);
        this.bottom = (y || 0) + (height || 0);
    }
};

let _uidCounter = 0;

export const elementByUId: { [uid: string]: HTMLElementWithUID } = {};

try {
    // IE11 only accepts `filter` argument as a function (not object with the `acceptNode`
    // property as the docs define). Also `entityReferenceExpansion` argument is not
    // optional. And it throws exception when the above arguments aren't there.
    document.createTreeWalker(document, NodeFilter.SHOW_ELEMENT);
    _isBrokenIE11 = false;
} catch (e) {
    _isBrokenIE11 = true;
}

export function createElementTreeWalker(doc: Document, root: Node, acceptNode: (node: Node) => number): TreeWalker | undefined {
    // IE11 will throw an exception when the TreeWalker root is not an Element.
    if (root.nodeType !== Node.ELEMENT_NODE) {
        return undefined;
    }

    // TypeScript isn't aware of IE11 behaving badly.
    const filter = (_isBrokenIE11 ? acceptNode : ({ acceptNode } as NodeFilter)) as any as NodeFilter;

    return doc.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, filter, false /* Last argument is not optional for IE11! */);
}

export function getBoundingRect(element: HTMLElementWithBoundingRectCacheId): AHDOMRect {
    let cacheId = element.__ahCacheId;
    let cached = cacheId ? _containerBoundingRectCache[cacheId] : undefined;

    if (cached) {
        return cached.rect;
    }

    const scrollingElement = element.ownerDocument && element.ownerDocument.documentElement;

    if (!scrollingElement) {
        return new _DOMRect();
    }

    // A bounding rect of the top-level element contains the whole page regardless of the
    // scrollbar. So, we improvise a little and limiting the final result...
    let left = 0;
    let top = 0;
    let right = scrollingElement.clientWidth;
    let bottom = scrollingElement.clientHeight;

    if (element !== scrollingElement) {
        const r = element.getBoundingClientRect();
        left = Math.max(left, r.left);
        top = Math.max(top, r.top);
        right = Math.min(right, r.right);
        bottom = Math.min(bottom, r.bottom);
    }

    const rect = new _DOMRect(
        left < right ? left : -1,
        top < bottom ? top : -1,
        left < right ? right - left : 0,
        top < bottom ? bottom - top : 0
    );

    if (!cacheId) {
        cacheId = 'r-' + ++_lastContainerBoundingRectCacheId;
        element.__ahCacheId = cacheId;
    }

    _containerBoundingRectCache[cacheId] = {
        rect,
        element
    };

    if (!_containerBoundingRectCacheTimer) {
        _containerBoundingRectCacheTimer = window.setTimeout(() => {
            _containerBoundingRectCacheTimer = undefined;

            for (let cId of Object.keys(_containerBoundingRectCache)) {
                delete _containerBoundingRectCache[cId].element.__ahCacheId;
            }

            _containerBoundingRectCache = {};
        }, 50);
    }

    return rect;
}

export function isElementVerticallyVisibleInContainer(element: HTMLElement): boolean {
    const container = getScrollableContainer(element);

    if (container) {
        const containerRect = getBoundingRect(container);
        const elementRect = element.getBoundingClientRect();

        return (elementRect.top >= containerRect.top) &&
            (elementRect.bottom <= containerRect.bottom);
    }

    return false;
}

export function isElementVisibleInContainer(element: HTMLElement, gap = 0): ElementVisibility {
    const container = getScrollableContainer(element);

    if (container) {
        const containerRect = getBoundingRect(container);
        const elementRect = element.getBoundingClientRect();

        if (
            ((elementRect.left > containerRect.right) || (elementRect.top > containerRect.bottom)) ||
            ((elementRect.bottom < containerRect.top) || (elementRect.right < containerRect.left))
        ) {
            return ElementVisibility.Invisible;
        }

        if (
            ((elementRect.top + gap >= containerRect.top) && (elementRect.top <= containerRect.bottom)) &&
            ((elementRect.bottom >= containerRect.top) && (elementRect.bottom - gap <= containerRect.bottom)) &&
            ((elementRect.left + gap >= containerRect.left) && (elementRect.left <= containerRect.right)) &&
            ((elementRect.right >= containerRect.left) && (elementRect.right - gap <= containerRect.right))
        ) {
            return ElementVisibility.Visible;
        }

        return ElementVisibility.PartiallyVisible;
    }

    return ElementVisibility.Invisible;
}

export function scrollIntoView(element: HTMLElement, alignToTop: boolean): void {
    // Built-in DOM's scrollIntoView() is cool, but when we have nested containers,
    // it scrolls all of them, not just the deepest one. So, trying to work it around.
    const container = getScrollableContainer(element);

    if (container) {
        const containerRect = getBoundingRect(container);
        const elementRect = element.getBoundingClientRect();

        if (alignToTop) {
            container.scrollTop += (elementRect.top - containerRect.top);
        } else {
            container.scrollTop += (elementRect.bottom - containerRect.bottom);
        }
    }
}

export function getScrollableContainer(element: HTMLElement): HTMLElement | null {
    const doc = element.ownerDocument;

    if (doc) {
        for (let el: HTMLElement | null = element.parentElement; el; el = el.parentElement) {
            if ((el.scrollWidth > el.clientWidth) || (el.scrollHeight > el.clientHeight)) {
                return el;
            }
        }

        return doc.documentElement;
    }

    return null;
}

export function makeFocusIgnored(element: HTMLElement): void {
    (element as FocusedElementWithIgnoreFlag).__shouldIgnoreFocus = true;
}

export function shouldIgnoreFocus(element: HTMLElement): boolean {
    return !!(element as FocusedElementWithIgnoreFlag).__shouldIgnoreFocus;
}

export function callOriginalFocusOnly(element: HTMLElement): void {
    const focus = element.focus as CustomFocusFunctionWithOriginal;

    if (focus.__ahFocus) {
        focus.__ahFocus.call(element);
    } else {
        element.focus();
    }
}

export function getUId(wnd: Window & { msCrypto?: Crypto }): string {
    const rnd = new Uint32Array(4);

    if (wnd.crypto && wnd.crypto.getRandomValues) {
        wnd.crypto.getRandomValues(rnd);
    } else if (wnd.msCrypto && wnd.msCrypto.getRandomValues) {
        wnd.msCrypto.getRandomValues(rnd);
    } else {
        for (let i = 0; i < rnd.length; i++) {
            rnd[i] = 0xffffffff * Math.random();
        }
    }

    const srnd: string[] = [];

    for (let i = 0; i < rnd.length; i++) {
        srnd.push(rnd[i].toString(36));
    }

    srnd.push('|');
    srnd.push((++_uidCounter).toString(36));
    srnd.push('|');
    srnd.push(Date.now().toString(36));

    return srnd.join('');
}

export function getElementUId(element: HTMLElementWithUID, window: Window): string {
    let uid = element.__ahElementUID;

    if (!uid) {
        uid = element.__ahElementUID = getUId(window);
    }

    if (!elementByUId[uid] && documentContains(element.ownerDocument, element)) {
        elementByUId[uid] = element;
    }

    return uid;
}

export function getWindowUId(window: WindowWithUID): string {
    let uid = window.__ahCrossOriginWindowUID;

    if (!uid) {
        uid = window.__ahCrossOriginWindowUID = getUId(window);
    }

    return uid;
}

export function clearElementCache(): void {
    for (let key of Object.keys(elementByUId)) {
        delete elementByUId[key];
    }
}

// IE11 doesn't have document.contains()...
export function documentContains(doc: HTMLDocument | null | undefined, element: HTMLElement): boolean {
    return !!(doc?.body?.contains(element));
}

export function matchesSelector(element: HTMLElement, selector: string): boolean {
    interface HTMLElementWithMatches extends HTMLElement {
        matchesSelector?: typeof HTMLElement.prototype.matches;
        msMatchesSelector?: typeof HTMLElement.prototype.matches;
    }

    const matches = element.matches ||
        (element as HTMLElementWithMatches).matchesSelector ||
        (element as HTMLElementWithMatches).msMatchesSelector ||
        element.webkitMatchesSelector;

    return matches && matches.call(element, selector);
}
