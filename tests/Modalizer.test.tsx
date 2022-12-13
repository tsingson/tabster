/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as React from "react";
import { getTabsterAttribute, Types } from "tabster";
import * as BroTest from "./utils/BroTest";

describe("Modalizer", () => {
    const getTestHtml = (
        options: Partial<Types.ModalizerProps> = {},
        options2?: Partial<Types.ModalizerProps>
    ) => {
        const rootAttr = getTabsterAttribute({ root: {} });
        const modalizerAttr = getTabsterAttribute({
            modalizer: { id: "modal", ...options },
        });
        const modalizerAttr2 = options2
            ? getTabsterAttribute({
                  modalizer: { id: "modal2", ...options2 },
              })
            : undefined;

        return (
            <div {...rootAttr}>
                <div id="hidden">
                    <div>Hidden</div>
                    <button id="outside">Outside</button>
                </div>
                <div aria-label="modal" id="modal" {...modalizerAttr}>
                    <button id="foo">Foo</button>
                    <button id="bar">Bar</button>
                    <button id="baz">Baz</button>
                </div>
                {modalizerAttr2 ? (
                    <div aria-label="modal2" id="modal2" {...modalizerAttr2}>
                        <button id="foo2">Foo2</button>
                        <button id="bar2">Bar2</button>
                        <button id="baz2">Baz2</button>
                    </div>
                ) : undefined}
            </div>
        );
    };

    beforeEach(async () => {
        await BroTest.bootstrapTabsterPage({ modalizer: true });
    });

    // makes sure that modalizer is cleaned up after each test run
    afterEach(async () => {
        await new BroTest.BroTest(<div></div>);
    });

    // it("should activate and set aria-hidden when focused", async () => {
    //     await new BroTest.BroTest(getTestHtml())
    //         .focusElement("#foo")
    //         .eval(() =>
    //             document.getElementById("hidden")?.getAttribute("aria-hidden")
    //         )
    //         .check((ariaHidden: string | undefined) =>
    //             expect(ariaHidden).toBe("true")
    //         )
    //         .eval(() =>
    //             document.getElementById("outside")?.hasAttribute("aria-hidden")
    //         )
    //         .check((hasAriaHidden: boolean | undefined) =>
    //             expect(hasAriaHidden).toBe(false)
    //         );
    // });

    it("should deactivate and restore aria-hidden when removed from DOM", async () => {
        await new BroTest.BroTest(getTestHtml())
            .focusElement("#foo")
            .eval(() => document.getElementById("modal")?.remove())
            .eval(() =>
                document.getElementById("hidden")?.hasAttribute("aria-hidden")
            )
            .check((hasAriaHidden: boolean | undefined) =>
                expect(hasAriaHidden).toBe(false)
            );
    });

    it("should deactivate and restore aria-hidden when programmatically focused somewhere else", async () => {
        await new BroTest.BroTest(getTestHtml())
            .focusElement("#foo")
            .focusElement("#outside")
            .eval(() =>
                document.getElementById("hidden")?.hasAttribute("aria-hidden")
            )
            .check((hasAriaHidden: boolean | undefined) =>
                expect(hasAriaHidden).toBe(false)
            );
    });

    it("should trap focus", async () => {
        await new BroTest.BroTest(getTestHtml())
            .focusElement("#foo")
            .activeElement((el) => expect(el?.textContent).toBe("Foo"))
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBe("Bar"))
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBe("Baz"))
            .pressTab()
            .activeElement((el) => expect(el).toBeNull())
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBe("Baz"))
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBe("Bar"))
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBe("Foo"))
            .pressTab(true)
            .activeElement((el) => expect(el).toBeNull())
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBe("Foo"));
    });

    describe("should restore focus", () => {
        it("after clicking on outside focusable", async () => {
            await new BroTest.BroTest(getTestHtml())
                .focusElement("#foo")
                .activeElement((el) => expect(el?.textContent).toBe("Foo"))
                .click("#outside")
                .wait(100)
                .activeElement((el) => expect(el?.textContent).toBe("Foo"));
        });

        it("asynchronously after user mutates DOM", async () => {
            await new BroTest.BroTest(getTestHtml())
                .focusElement("#foo")
                .activeElement((el) => expect(el?.textContent).toBe("Foo"))
                .eval(() => {
                    // Simulates user clicking outside a modal dialog to close it
                    document.addEventListener("click", () => {
                        document.getElementById("modal")?.remove();
                    });
                })
                .click("#outside")
                .activeElement((el) => expect(el?.textContent).toBe("Outside"));
        });
    });

    describe("Others content accessible", () => {
        it("should not allow focus outside of modalizer", async () => {
            await new BroTest.BroTest(
                getTestHtml({ isOthersAccessible: false })
            )
                .focusElement("#foo")
                .eval(() =>
                    document
                        .getElementById("hidden")
                        ?.hasAttribute("aria-hidden")
                )
                .check((hasAriaHidden: boolean | undefined) =>
                    expect(hasAriaHidden).toBe(false)
                )
                .pressTab(true)
                .activeElement((el) => expect(el).toBeNull())
                .pressTab(true)
                .activeElement((el) => expect(el?.attributes.id).toBe("baz"))
                .click("#outside")
                .wait(200)
                .activeElement((el) => expect(el?.attributes.id).toBe("foo"));
        });

        it("should allow focus outside of modalizer", async () => {
            await new BroTest.BroTest(getTestHtml({ isOthersAccessible: true }))
                .focusElement("#foo")
                .eval(() =>
                    document
                        .getElementById("hidden")
                        ?.hasAttribute("aria-hidden")
                )
                .check((hasAriaHidden: boolean | undefined) =>
                    expect(hasAriaHidden).toBe(false)
                )
                .pressTab(true)
                .activeElement((el) => expect(el).toBeNull())
                .pressTab(true)
                .activeElement((el) => expect(el?.attributes.id).toBe("baz"))
                .click("#outside")
                .wait(200)
                .activeElement((el) =>
                    expect(el?.attributes.id).toBe("outside")
                );
        });

        it("should not allow focus into modalizer with isOthersAccessible", async () => {
            await new BroTest.BroTest(getTestHtml({ isOthersAccessible: true }))
                .focusElement("#outside")
                .pressTab()
                .activeElement((el) => expect(el).toBeNull());
        });

        it("should allow focus into modalizer with isAlwaysAccessible when no other modalizer is active", async () => {
            await new BroTest.BroTest(
                getTestHtml(
                    { isAlwaysAccessible: true },
                    { isAlwaysAccessible: true }
                )
            )
                .focusElement("#outside")
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("foo"))
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("bar"))
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("baz"))
                .pressTab()
                .activeElement((el) => expect(el).toBeNull())
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("foo"));
        });

        it("should implement circular focus trap", async () => {
            await new BroTest.BroTest(getTestHtml({ isTrapped: true }))
                .focusElement("#foo")
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("bar"))
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("baz"))
                .pressTab()
                .activeElement((el) => expect(el?.attributes.id).toBe("foo"));
        });
    });
});

// describe("New Modalizer that already has focus", () => {
//     const getTestHtml = () => {
//         const rootAttr = getTabsterAttribute({ root: {} });

//         return (
//             <div {...rootAttr}>
//                 <div id="hidden">
//                     <div>Hidden</div>
//                     <button id="outside">Outside</button>
//                 </div>
//                 <div aria-label="modal" id="modal">
//                     <button id="foo">Foo</button>
//                     <button>Bar</button>
//                 </div>
//             </div>
//         );
//     };

//     beforeEach(async () => {
//         await BroTest.bootstrapTabsterPage({ modalizer: true });
//     });

//     // makes sure that modalizer is cleaned up after each test run
//     afterEach(async () => {
//         await new BroTest.BroTest(<div></div>);
//     });

//     // it("should be activated", async () => {
//     //     const tabsterAttr = getTabsterAttribute(
//     //         {
//     //             modalizer: { id: "modal " },
//     //         },
//     //         true
//     //     ) as string;

//     //     await new BroTest.BroTest(getTestHtml())
//     //         .focusElement("#foo")
//     //         .eval(
//     //             (attrName, tabsterAttr) => {
//     //                 const newModalizer = document.getElementById("modal");
//     //                 newModalizer?.setAttribute(attrName, tabsterAttr);
//     //             },
//     //             Types.TabsterAttributeName,
//     //             tabsterAttr
//     //         )
//     //         .eval(() =>
//     //             document.getElementById("hidden")?.getAttribute("aria-hidden")
//     //         )
//     //         .check((ariaHidden: string | undefined) =>
//     //             expect(ariaHidden).toBe("true")
//     //         );
//     // });
// });

describe("Modalizer with multiple containers", () => {
    beforeEach(async () => {
        await BroTest.bootstrapTabsterPage({
            modalizer: true,
            mover: true,
            groupper: true,
        });
    });

    it("should", async () => {
        await new BroTest.BroTest(
            (
                <div {...getTabsterAttribute({ root: {} })}>
                    <button>Button1</button>
                    <div
                        {...getTabsterAttribute({
                            modalizer: {
                                id: "multi-modal",
                                isAlwaysAccessible: true,
                            },
                        })}
                    >
                        <button>ModalButton1</button>
                        <button>ModalButton2</button>
                    </div>
                    <button>Button2</button>
                    <div
                        {...getTabsterAttribute({
                            modalizer: { id: "multi-modal" },
                        })}
                    >
                        <button>ModalButton3</button>
                        <button>ModalButton4</button>
                    </div>
                    <button>Button3</button>
                </div>
            )
        )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toEqual("Button1"))
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton4")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1")
            );
    });

    it("should escape the modalizer combined with groupper", async () => {
        await new BroTest.BroTest(
            (
                <div {...getTabsterAttribute({ root: {} })}>
                    <div
                        {...getTabsterAttribute({
                            mover: {
                                direction: Types.MoverDirections.Vertical,
                            },
                        })}
                    >
                        <div
                            tabIndex={0}
                            {...getTabsterAttribute({
                                modalizer: {
                                    id: "modal",
                                    isAlwaysAccessible: true,
                                    isOthersAccessible: true,
                                    isTrapped: true,
                                },
                                groupper: {
                                    tabbability:
                                        Types.GroupperTabbabilities
                                            .LimitedTrapFocus,
                                },
                            })}
                        >
                            <button>ModalButton1</button>
                            <button>ModalButton2</button>
                        </div>
                        <button>Button1</button>
                        <div
                            tabIndex={0}
                            {...getTabsterAttribute({
                                modalizer: {
                                    id: "modal",
                                    isAlwaysAccessible: true,
                                    isOthersAccessible: true,
                                    isTrapped: true,
                                },
                                groupper: {
                                    tabbability:
                                        Types.GroupperTabbabilities
                                            .LimitedTrapFocus,
                                },
                            })}
                        >
                            <button>ModalButton3</button>
                            <button>ModalButton4</button>
                        </div>
                        <button>Button2</button>
                    </div>
                </div>
            )
        )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1ModalButton2")
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1")
            )
            .pressEsc()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1ModalButton2")
            );
    });

    it("should work in a very monstrous complex case with Movers and Grouppers", async () => {
        await new BroTest.BroTest(
            (
                <div {...getTabsterAttribute({ root: {} })}>
                    <div
                        {...getTabsterAttribute({
                            mover: {},
                        })}
                    >
                        <div
                            id="groupper1"
                            tabIndex={0}
                            {...getTabsterAttribute({
                                groupper: {
                                    tabbability:
                                        Types.GroupperTabbabilities
                                            .LimitedTrapFocus,
                                },
                            })}
                        >
                            <div
                                {...getTabsterAttribute({
                                    mover: {},
                                })}
                            >
                                <div
                                    id="groupper1-1"
                                    tabIndex={0}
                                    {...getTabsterAttribute({
                                        groupper: {
                                            tabbability:
                                                Types.GroupperTabbabilities
                                                    .Unlimited,
                                        },
                                        modalizer: {
                                            id: "modal",
                                            isOthersAccessible: true,
                                        },
                                    })}
                                >
                                    <button>ModalButton1.1</button>
                                    <div
                                        {...getTabsterAttribute({
                                            mover: {},
                                        })}
                                    >
                                        <div
                                            tabIndex={0}
                                            {...getTabsterAttribute({
                                                groupper: {
                                                    tabbability:
                                                        Types
                                                            .GroupperTabbabilities
                                                            .LimitedTrapFocus,
                                                },
                                            })}
                                        >
                                            <button>ModalButton1.2</button>
                                            <button>ModalButton1.3</button>
                                        </div>
                                        <div
                                            tabIndex={0}
                                            {...getTabsterAttribute({
                                                groupper: {
                                                    tabbability:
                                                        Types
                                                            .GroupperTabbabilities
                                                            .LimitedTrapFocus,
                                                },
                                            })}
                                        >
                                            <button>ModalButton1.4</button>
                                            <button>ModalButton1.5</button>
                                        </div>
                                    </div>
                                    <button>ModalButton1.6</button>
                                </div>
                                <div
                                    tabIndex={0}
                                    id="groupper1-2"
                                    {...getTabsterAttribute({
                                        groupper: {
                                            tabbability:
                                                Types.GroupperTabbabilities
                                                    .LimitedTrapFocus,
                                        },
                                        modalizer: {
                                            id: "modal2",
                                            isTrapped: true,
                                        },
                                    })}
                                >
                                    <button>ModalButton2.1</button>
                                    <button>ModalButton2.2</button>
                                </div>
                            </div>
                        </div>
                        <div
                            id="groupper2"
                            tabIndex={0}
                            {...getTabsterAttribute({
                                groupper: {
                                    tabbability:
                                        Types.GroupperTabbabilities
                                            .LimitedTrapFocus,
                                },
                            })}
                        >
                            <div
                                {...getTabsterAttribute({
                                    mover: {},
                                })}
                            >
                                <div
                                    id="groupper2-1"
                                    tabIndex={0}
                                    {...getTabsterAttribute({
                                        groupper: {
                                            tabbability:
                                                Types.GroupperTabbabilities
                                                    .LimitedTrapFocus,
                                        },
                                        modalizer: {
                                            id: "modal3",
                                            isAlwaysAccessible: true,
                                            isOthersAccessible: true,
                                        },
                                    })}
                                >
                                    <button id="modal-button-3-1">
                                        ModalButton3.1
                                    </button>
                                    <button>ModalButton3.2</button>
                                </div>
                                <div
                                    id="groupper2-2"
                                    tabIndex={0}
                                    {...getTabsterAttribute({
                                        groupper: {
                                            tabbability:
                                                Types.GroupperTabbabilities
                                                    .LimitedTrapFocus,
                                        },
                                    })}
                                >
                                    <div
                                        {...getTabsterAttribute({
                                            mover: {},
                                        })}
                                    >
                                        <div
                                            id="groupper2-2-1"
                                            tabIndex={0}
                                            {...getTabsterAttribute({
                                                groupper: {
                                                    tabbability:
                                                        Types
                                                            .GroupperTabbabilities
                                                            .LimitedTrapFocus,
                                                },
                                            })}
                                        >
                                            <button>NonModalButton1</button>
                                            <button>NonModalButton2</button>
                                        </div>
                                        <div
                                            id="groupper2-2-2"
                                            tabIndex={0}
                                            {...getTabsterAttribute({
                                                groupper: {
                                                    tabbability:
                                                        Types
                                                            .GroupperTabbabilities
                                                            .LimitedTrapFocus,
                                                },
                                                modalizer: {
                                                    id: "modal3",
                                                    isAlwaysAccessible: true,
                                                },
                                            })}
                                        >
                                            <button>ModalButton3.3</button>
                                            <button>ModalButton3.4</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        {...getTabsterAttribute({
                            modalizer: { id: "modal2", isTrapped: true },
                        })}
                    >
                        <button>ModalButton2.3</button>
                        <button>ModalButton2.4</button>
                    </div>
                    <div
                        {...getTabsterAttribute({
                            modalizer: { id: "modal3" },
                        })}
                    >
                        <button>ModalButton3.5</button>
                        <button>ModalButton3.6</button>
                    </div>
                </div>
            )
        )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual(
                    "ModalButton1.1ModalButton1.2ModalButton1.3ModalButton1.4ModalButton1.5ModalButton1.6ModalButton2.1ModalButton2.2"
                )
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual(
                    "ModalButton3.1ModalButton3.2NonModalButton1NonModalButton2ModalButton3.3ModalButton3.4"
                )
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1ModalButton3.2")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual(
                    "ModalButton3.1ModalButton3.2NonModalButton1NonModalButton2ModalButton3.3ModalButton3.4"
                )
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1ModalButton3.2")
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.2")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.3")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.4")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.5")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.6")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1")
            )
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.6")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.5")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.4")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.3")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.2")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1")
            )
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .click("#groupper1-2")
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.1ModalButton2.2")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .click("#groupper1-2")
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.1ModalButton2.2")
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.2")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.3")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.4")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.1")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.4")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.3")
            )
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton2.2")
            )
            .click("#groupper1-1")
            .wait(200)
            // .activeElement((el) =>
            //     expect(el?.textContent).toEqual("ModalButton2.1")
            // )
            .focusElement("#groupper1-1")
            .wait(200)
            .activeElement((el) =>
                expect(el?.textContent).toEqual(
                    "ModalButton1.1ModalButton1.2ModalButton1.3ModalButton1.4ModalButton1.5ModalButton1.6"
                )
            )
            .pressTab()
            .wait(200)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.1")
            )
            .pressTab(true)
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab(true)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.6")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.2ModalButton1.3")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.6")
            )
            .pressTab()
            .activeElement((el) => expect(el?.textContent).toBeUndefined())
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.1")
            )
            .pressDown()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.2ModalButton1.3")
            )
            .pressDown()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.4ModalButton1.5")
            )
            .pressEnter()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.4")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.5")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.4")
            )
            .pressEsc()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.4ModalButton1.5")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton1.6")
            )
            .click("#modal-button-3-1")
            .wait(200)
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.1")
            )
            .pressTab()
            .activeElement((el) =>
                expect(el?.textContent).toEqual("ModalButton3.2")
            );
    });
});
