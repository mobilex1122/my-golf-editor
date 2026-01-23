


export function showToast(msg:string, type?:"info" | "error") {
    const oldNot = document.getElementById("main-toast");
    if (oldNot) oldNot.remove();
    console.log("Toast: " + msg);
    const n = document.createElement("x-notification") as HTMLElement & {opened: boolean,timeout:number};
    n.id = "main-toast"
    n.innerText = msg;
    n.classList.add(type??"info");
    n.setAttribute("timeout", "2000");
    document.body.appendChild(n);
    n.opened = true;
}