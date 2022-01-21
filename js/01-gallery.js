/*
Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в модальном окне. Посмотри демо видео работы галереи. Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:
*/

/*
1. Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента галереи. 
--------------------------------------------------------------------------------

2. Реализация делегирования на div.gallery и получение url большого изображения.
--------------------------------------------------------------------------------

3. Подключение скрипта и стилей библиотеки модального окна basicLightbox. Используй CDN сервис jsdelivr и добавь в проект ссылки на минифицированные (.min) файлы библиотеки.
--------------------------------------------------------------------------------

4. Открытие модального окна по клику на элементе галереи. Для этого ознакомься с документацией и примерами.

5. Замена значения атрибута src элемента <img> в модальном окне перед открытием. Используй готовую разметку модального окна с изображением из примеров библиотеки basicLightbox.

---------------------- Разметка элемента галереи -------------------------

1. Ссылка на оригинальное изображение должна храниться в data-атрибуте source на элементе <img>, и указываться в href ссылки. Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом шаблоне.

<div class="gallery__item">
  <a class="gallery__link" href="large-image.jpg">
    <img
      class="gallery__image"
      src="small-image.jpg"
      data-source="large-image.jpg"
      alt="Image description"
    />
  </a>
</div>

2. Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию пользователь будет перенаправлен на другую страницу. Запрети это поведение по умолчанию.

3. Закрытие с клавиатуры
⚠️ Следующий функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

Добавь закрытие модального окна по нажатию клавиши Escape. Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно. У библиотеки basicLightbox есть метод для программного закрытия модального окна.
*/

import { galleryItems } from "./gallery-items.js";

const galleryContainerEl = document.querySelector(".gallery");

const galleryItemsList = makeGalleryItemsListMarkup(galleryItems);
galleryContainerEl.insertAdjacentHTML("beforeend", galleryItemsList);

galleryContainerEl.addEventListener("click", onGalleryImageElClick);

function makeGalleryItemsListMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source = "${original}"
      alt= "${description}"
    />
  </a>
</div>
    `;
    })
    .join("");
}

// window.removeEventListener("keydown", onEscKeyDownClick);

function onGalleryImageElClick(event) {
  event.preventDefault();

  const imageAltDescription = event.target.alt;
  const imageLinkEl = event.target.dataset.source;
  if (!imageLinkEl) {
    return;
  }

  const imageOriginalForShow = basicLightbox.create(
    `<img src = '${imageLinkEl}', alt='${imageAltDescription}'>`
  );
  imageOriginalForShow.show();

  window.addEventListener("keydown", onEscKeyDownClick);

  function onEscKeyDownClick(event) {
    if (event.code === "Escape") {
      imageOriginalForShow.close();
      window.removeEventListener("keydown", onEscKeyDownClick);
      console.log("not listening to an event");
    }
  }
}
