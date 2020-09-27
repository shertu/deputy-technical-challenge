import {Role, User, getSubordinates} from './challenge';


export const roleCollection: Role[] = [{
  id: 1,
  name: 'System Administrator',
  parent: 0,
}, {
  id: 2,
  name: 'Location Manager',
  parent: 1,
}, {
  id: 3,
  name: 'Supervisor',
  parent: 2,
}, {
  id: 4,
  name: 'Employee',
  parent: 3,
}, {
  id: 5,
  name: 'Trainer',
  parent: 3,
}];

export const userCollection: User[] = [{
  id: 1,
  name: 'Adam Admin',
  role: 1,
}, {
  id: 2,
  name: 'Emily Employee',
  role: 4,
}, {
  id: 3,
  name: 'Sam Supervisor',
  role: 3,
}, {
  id: 4,
  name: 'Mary Manager',
  role: 2,
}, {
  id: 5,
  name: 'Steve Trainer',
  role: 5,
}];

const exampleOneResult: User[] = [
  userCollection[1], userCollection[4],
];

const exampleTwoResult: User[] = [
  userCollection[1], userCollection[2], userCollection[3], userCollection[4],
];

test('provided example one', () => {
  expect(getSubordinates(roleCollection, userCollection, 3)).toEqual(
      expect.arrayContaining(exampleOneResult),
  );
});

test('provided example two', () => {
  expect(getSubordinates(roleCollection, userCollection, 1)).toEqual(
      expect.arrayContaining(exampleTwoResult),
  );
});
