/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */

export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.createTable();
  }

  createTable() {
    let table = document.createElement('table');

    let tbodyInner = this.rows.map((row) => {
      let cell = '';

      for (let key in row) {
        cell += `<td>${row[key]}</td>`;
      }

      return `
        <tr>
            ${cell}
            <td><button>X</button></td>
        </tr>
      `;
    }).join('');

    table.innerHTML = `
        <thead>
            <tr>
              <td>Имя</td>
              <td>Возраст</td>
              <td>Зарплата</td>
              <td>Город</td>
              <td></td>
            </tr>
        </thead>
        <tbody>
            ${tbodyInner}
        </tbody>
    `;

    table.addEventListener('click', (e) => this.onDelete(e));

    return table;
  }

  onDelete(e) {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    let row = e.target.closest('tr');

    row.remove();
  }
}
