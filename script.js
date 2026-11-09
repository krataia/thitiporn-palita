// One <dialog> shows any activity or certificate in full: all its photos and the untruncated text.
const sheet = document.getElementById("sheet");
const sheetLabel = sheet.querySelector(".sheet-label");
const sheetTitle = sheet.querySelector("h2");
const sheetText = sheet.querySelector(".sheet-text");
const sheetPhotos = sheet.querySelector(".sheet-photos");

function open(item) {
  const person = item.closest("[data-person]");
  sheet.dataset.person = person ? person.dataset.person : "";
  sheetLabel.textContent = item.querySelector(".label")?.textContent ?? "";
  sheetTitle.textContent = item.querySelector("h3").textContent;
  const text = item.querySelector("p:not(.label):not(.more)");
  sheetText.textContent = text ? text.textContent : "";
  sheetText.hidden = !text;

  // Photos: the one on the card plus any extras kept in its <template>
  sheetPhotos.replaceChildren();
  const imgs = [item.querySelector("img"), ...(item.querySelector("template")?.content.querySelectorAll("img") ?? [])];
  for (const img of imgs) {
    const copy = new Image();
    copy.src = img.src;
    copy.alt = img.alt;
    sheetPhotos.append(copy);
  }

  sheet.showModal();
  sheet.scrollTop = 0;
}

document.addEventListener("click", (e) => {
  const item = e.target.closest(".card, .cert");
  if (item) open(item);
});

sheet.querySelector(".sheet-close").addEventListener("click", () => sheet.close());
// Click on the backdrop (outside the dialog box) closes it
sheet.addEventListener("click", (e) => {
  if (e.target === sheet) sheet.close();
});

document.getElementById("year").textContent = new Date().getFullYear() + 543;
