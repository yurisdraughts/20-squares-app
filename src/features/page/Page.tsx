import { useAppSelector } from "../../app/hooks"
import rules from "./Rules_of_Royal_Game_of_Ur.svg.png"
import style from "./Page.module.scss"

export function Page({ children }: { children: JSX.Element }) {
  const isInitialState = useAppSelector((state) => state.board.isInitialState)

  return (
    <>
      <div className={style.header__container}>
        <header className={style.header}>
          <h1 className={style.header__heading}>«Царская игра Ура»</h1>
          <a className={style.header__button} href="#app">
            {isInitialState ? "Начать" : "Продолжить"} игру
          </a>
        </header>
        <div className={style.content}>
          <div className={style.content__section}>
            <div>
              <p className={style.content__paragraph}>
                «Царская игра Ура» или «Игра Ура», также известная как «Игра
                двадцати квадратов», — настольная игра для двух игроков,
                появившаяся в древней Месопотамии. Самая старая игральная доска
                датируется 2600 — 2400 гг. до нашей эры, что делает эту игру
                старейшей известной настольной игрой.
              </p>
              <p className={style.content__paragraph}>
                Целью игры является переместить все семь фишек по маршруту,
                изображённому на рисунке №2. Средний ряд клеток принадлежит
                обеим игрокам, и находящаяся на нём фишка может быть снята с
                доски фишкой противника и отправлена в начальную позицию.
                Исключением является клетка с «розеткой», снять фишку противника
                с которой нельзя.
              </p>
            </div>

            <figure className={style.fig}>
              <img
                className={style.fig__img}
                width={576}
                height={434}
                src="https://media.britishmuseum.org/media/Repository/Documents/2014_11/12_11/78f4c34d_5f5b_4b19_beee_a3e100b6cd73/mid_00098326_001.jpg"
                alt="Игральная доска, фишки и кости"
              />
              <figcaption className={style.fig__caption}>
                <span className={style.italic}>Рисунок №1</span> — Одна из досок
                для игры с фишками и игральными костями, найденная во время
                раскопок царского кладбища города Ур, по имени которого игра и
                получила своё современное название (
                <span className={style.italic}>
                  <a
                    className={style.fig__link}
                    href="https://www.britishmuseum.org/collection/object/W_1928-1009-378"
                    target="_blank"
                  >
                    источник
                  </a>
                </span>
                )
              </figcaption>
            </figure>
          </div>

          <div className={style.content__section}>
            <figure className={style.fig}>
              <img
                className={style.fig__img}
                width={480}
                height={181}
                src={rules}
                alt=""
              />
              <figcaption className={style.fig__caption}>
                <span className={style.italic}>Рисунок №2</span> — пути фишек
                двух игроков по доске (
                <span className={style.italic}>
                  <a
                    className={style.fig__link}
                    href="https://commons.wikimedia.org/wiki/File:Rules_of_Royal_Game_of_Ur.svg"
                    target="_blank"
                  >
                    источник
                  </a>
                </span>
                )
              </figcaption>
            </figure>

            <div>
              <p className={style.content__paragraph}>
                Помимо того, что центральная клетка с «розеткой» гарантирует
                безопасность фишке игрока, попадание на любую из пяти «розеток»
                даёт игроку право на второй ход.
              </p>
              <p className={style.content__paragraph}>
                Движения определяются броском двух костей, на каждой из которых
                может выпасть единица или двойка, а значит за один ход фишка
                может передвинуться на 2, 3 или 4 клетки вперёд.
              </p>
            </div>
          </div>

          <div className={style.content__section}>
            <div>
              <p className={style.content__paragraph}>
                Фишку можно снять с доски, если она находится на последней,
                предпоследней или третей с конца клетке и на костях выпало 2, 3
                или 4 очка, соотвественно. Если у игрока нет фишек, которые
                могли бы совершить ход, то он его пропускает.
              </p>
            </div>
            <div>
              <p className={style.content__paragraph}>
                Игральные кости и фишки, с которыми игрок может
                взаимодействовать во время своего хода выделены{" "}
                <span className={style.playerColor}>красным</span>. Во время
                хода программы игральные кости и выбранная ею фишка выделены{" "}
                <span className={style.programColor}>зелёным</span>.
              </p>
              <p className={style.content__paragraph}>
                <span className={style.italic}>
                  Репозиторий GitHub с исходным кодом можно найти{" "}
                  <a
                    className={style.content__link}
                    href="https://github.com/yurisdraughts/20-squares-app"
                    target="_blank"
                  >
                    по ссылке
                  </a>
                  .
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="app">{children}</div>
      <footer className={style.footer}></footer>
    </>
  )
}
