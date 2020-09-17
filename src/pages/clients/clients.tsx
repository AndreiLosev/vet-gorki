import React from 'react'
import cn from 'classnames'
import './clients.scss'


export const Clients = () => {
  return (
    <div className={cn('clientsConteiner')}>
      <header className={cn('tooolbar')}>
        <div className={cn('buttonWrap')}>
          <div aria-label="Создать нового клиента" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="+" />
          </div>
          <div aria-label="Редактировать выброного клиента" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#9997;" />
          </div>
          <div aria-label="Удалить выброного клиента" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#215;" />
          </div>
          <div aria-label="Печать" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#128438;" />
          </div>
          <input className={cn('search')} type="text" placeholder="ФИО, Адрес, Телефон" />
          <div aria-label="Поиск" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#128270;" />
          </div>
          <div aria-label="Добавить питомца клиенту" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="+1" />
          </div>
          <div aria-label="Редактировать питомца клиенту" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="&#9998;" />
          </div>
          <div aria-label="Удалить выброного питомца" data-microtip-position="bottom-right" role="tooltip">
            <input type="button" value="-1" />
          </div>
        </div>
      </header>
      <div className={cn('contentWrapper')}>
        <form className={cn('createNewClient')}>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Имя клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="Имя" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Фамилия клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="фамилия" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Отчество клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="Отчество" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Телефон клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="Телефон" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Населённый пункт клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="Населённый пункт" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="Улица клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="Улица" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="№ дома клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="№ дома" />
            </div>
          </div>
          <div className={cn('wrapp', 'text1')}>
            <div aria-label="№ квартиры клиента" data-microtip-position="bottom-right" role="tooltip">
              <input className={'inputText'} type="text" placeholder="№ Квартиры" />
            </div>
          </div>
          <div className={cn('wrapp', 'submit1')}>
            <input className={'inputSubmit'} type="submit" value="Создать" />
          </div>
        </form>
        <div className={cn('content')}>
          <div className={cn('clientsAndPet')}>
            <div className={cn('clientsTable')}>
              <div className={cn('row', 'header')}>
                <div>№</div>
                <div>ФИО</div>
                <div>Адрес</div>
                <div>Дата регистрации</div>
              </div>
              <div className="scrol">
                <div className={cn('row', 'body')}>
                  <div>1</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
                <div className={cn('row', 'body')}>
                  <div>2</div>
                  <div>Лосев Андрей Геннадьевич</div>
                  <div>Якубовского 13-23</div>
                  <div>11.09.2020</div>
                </div>
              </div>
            </div>
            <div className={cn('petsTable')}>
              <div className={cn('row', 'header')}>
                <div>№</div>
                <div>Кличка</div>
                <div>Вид</div>
                <div>Порода</div>
                <div>Пол</div>
              </div>
              <div className="scrol">
                <div className={cn('row', 'body')}>
                  <div>1</div>
                  <div>Ватрушка</div>
                  <div>Хомяк</div>
                  <div>Хомяк домашний</div>
                  <div>Ж</div>
                </div>
              </div>
            </div>
          </div>
          <div className={cn('buttonWrap')}>
            <div aria-label="Добавить новую запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="+" />
            </div>
            <div aria-label="Редактировать выбраную запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="&#9997;" />
            </div>
            <div aria-label="Удалить выбраную запись" data-microtip-position="bottom-right" role="tooltip">
              <input type="button" value="&#215;" />
            </div>
          </div>
          <div className="visits">
          <div className={cn('visitsTable')}>
            <div className={cn('row', 'header')}>
              <div>№</div>
              <div>Кличка</div>
              <div>Вид</div>
              <div>Порода</div>
              <div>Пол</div>
              <div>Возраст</div>
              <div>Вес</div>
              <div>Темпе<wbr />ратура</div>
              <div>Дата посещения</div>
            </div>
            <div className="scrol">
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
              <div className={cn('row', 'body')}>
                <div>1</div>
                <div>Труша</div>
                <div>Хомяк</div>
                <div>домашний хомяк</div>
                <div>Ж</div>
                <div>1,5</div>
                <div>0,35</div>
                <div>36,6</div>
                <div>11.09.2020</div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
