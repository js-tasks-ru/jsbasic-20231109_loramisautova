function showSalary(users, age) {
  return users.reduce((acc, user) => {
    if (user.age <= age) {
      if (acc) {
        acc += `\n`;
      }
      acc += `${user.name}, ${user.balance}`;
    }

    return acc;
  }, '');
}
