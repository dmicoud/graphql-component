'use strict';

const Test = require('tape');
const Types = require('../lib/types');
const { buildFragments } = require('../lib/fragments');

Test('type utilities', (t) => {

  t.test('fragment test A, B', (t) => {
    t.plan(2);
    const component = {
      _importedTypes: [],
      _types: [`
        type A {
          value: String
          b: B
        }
        type B {
          value: String
        }
        type Query {
          a: A
        }
      `]
    };
    const types = Types.getImportedTypes({}, component);
    const fragments = buildFragments(types[0]);

    t.equal(fragments[0], 'fragment AllA on A { value, b { ...AllB } }', 'Expect Fragment AllA contains value, AllB');
    t.equal(fragments[1], 'fragment AllB on B { value }', 'Expect Fragment AllB contains B value');
  });

  t.test('fragment test A, !B', (t) => {
    t.plan(2);
    const component = {
      _importedTypes: [],
      _types: [`
        type A {
          value: String
          b: B!
        }
        type B {
          value: String
        }
      `]
    };
    const types = Types.getImportedTypes({}, component);
    const fragments = buildFragments(types[0]);

    t.equal(fragments[0], 'fragment AllA on A { value, b { ...AllB } }', 'Expect Fragment AllA contains value, AllB');
    t.equal(fragments[1], 'fragment AllB on B { value }', 'Expect Fragment AllB contains B value');
  });

});