const extractDataFromCell = (element) => {
    let pair = {};
    const childrens = element.children;

    const typePairInfo = childrens[0];
    const className =
        ["lek", "pr", "lab"].find((type) =>
            typePairInfo.classList.contains(type)
        ) || "undefined";
    pair["type"] = className;

    pair["name"] = childrens[1].innerText;
    pair["auditory"] = childrens[2].innerText;

    if (childrens.length > 3) {
        const tutor = childrens[3];
        pair["tutor"] = {
            name: tutor.innerText,
            href: tutor.href,
        };
    }
    return pair;
};

const blocks = document.querySelectorAll("td");
const filtered_blocks = [];

blocks.forEach((element, index) => {
    if (element.children.length > 0) {
        const filtered_data = [...element.children].filter((el) =>
            el.classList.contains("cell")
        );
        if (filtered_data.length > 0) {
            element.setAttribute("data-id", index);
            filtered_blocks.push(element);
        }
    }
});

if (localStorage.getItem("blocks") === null) {
    const blocksData = {};
    blocks.forEach((element, index) => {
        const blockCells = element.querySelectorAll(".cell");
        const id = element.getAttribute("data-id");
        let blockCellsData = {};
        blockCells.forEach(
            (cell, id) => (blockCellsData[id] = extractDataFromCell(cell))
        );
        blocksData[id] = blockCellsData;
    });
    localStorage.setItem("blocks", JSON.stringify(blocksData));
}

const gavno = (classname) => {
    cell.querySelector(classname).addEventListener("click", (e) => {
        const target = e.target;
        const targetCell = extractDataFromCell(target.closest(".cell"));
        const parentId = target.closest("td").getAttribute("data-id");
        const id = target.closest(".cell").getAttribute("id");
        const newData = prompt("Новое название");

        classname === ".subject"
            ? (unpackData[parentId][id].name = newData)
            : (unpackData[parentId][id].room = newData);
        localStorage.setItem("blocks", JSON.stringify(unpackData));
        target.innerText = newData;
    });
};

blocks.forEach((element, index) => {
    if (element.children.length > 0) {
        const filtered_data = [...element.children].filter((el) =>
            el.classList.contains("cell")
        );
        filtered_data.forEach((cell, index) => {
            cell.setAttribute("id", index);
            const unpackData = JSON.parse(localStorage.getItem("blocks"));
            cell.querySelector(".subject").innerText =
                unpackData[cell.closest("td").getAttribute("data-id")][
                    cell.getAttribute("id")
                ].name;
            cell.querySelector(".room a").innerText =
                unpackData[cell.closest("td").getAttribute("data-id")][
                    cell.getAttribute("id")
                ].room;

            gavno(".subject");
            ganvo(".room a");
        });
    }
});