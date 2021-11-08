/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

export const runIfControlled = !process.env.UNCONTROLLED ? describe : xdescribe;
export const runIfUnControlled = process.env.UNCONTROLLED ? describe : xdescribe;
