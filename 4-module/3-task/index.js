function highlight(table) {
  let rows = table.querySelectorAll('tbody > tr');

  rows.forEach(row => {
    let statusCell = row.querySelector('td[data-available]');
    let ageCell = row.querySelector('td:nth-child(2)');
    let genderCell = row.querySelector('td:nth-child(3)');

    if (statusCell) {
      let isAvailable = statusCell.dataset.available === 'true';
      row.classList.add(isAvailable ? 'available' : 'unavailable');
    } else {
      row.setAttribute('hidden', '');
    }

    if (genderCell) {
      let genderSymbol = genderCell.textContent;
      row.classList.add(genderSymbol === 'm' ? 'male' : 'female');
    }

    if (ageCell && parseInt(ageCell.textContent) < 18) {
      row.style.textDecoration = 'line-through';
    }
  });
}
