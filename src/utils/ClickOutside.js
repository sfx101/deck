/**
 * Dispatch event on click outside of node
 *
 * How to use :
 * step 1 - import [import { clickOutside } from "./ClickOutside";]
 * step 2 - use on div [<div use:clickOutside on:clickOutside={close} > </div>]
 */
export function clickOutside(node) {
    const handleClick = (event) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(new CustomEvent("clickOutside", node));
        }
    };
    document.addEventListener("click", handleClick, true);
    return {
        destroy() {
            document.removeEventListener("click", handleClick, true);
        },
    };
}
