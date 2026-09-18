import { readFileSync } from 'node:fs';
import { runInNewContext, Script } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const html = readFileSync(new URL('../public/herramientas/presupuesto.html', import.meta.url), 'utf8');
const core = html.split('/* CORE_START */')[1].split('/* CORE_END */')[0];
const { calculate, validState, parseAmount } = runInNewContext(`${core}; ({calculate, validState, parseAmount});`, { Intl });
const budget = () => ({ version: 1, month: '2026-09', ingresos: [{name: 'Salario', amount: 4500000}, {name: 'Proyectos', amount: 1500000}], gastos: [{name:'Gastos', amount:3000000}], inversion: [{name:'Inversión',amount:900000}], ahorro:[{name:'Ahorro',amount:900000}] });

test('el presupuesto de ejemplo conserva el saldo y reparte proporcionalmente cada ingreso', () => {
  const r = calculate(budget());
  assert.equal(r.ingresos, 6000000);
  assert.equal(r.assigned, 4800000);
  assert.equal(r.net, 1200000);
  assert.equal(r.allocated, 80);
  assert.equal(r.shares[0].ratio, .75);
  assert.equal(r.shares[0].net, 900000);
  assert.equal(r.shares[1].net, 300000);
  for (const key of ['gastos', 'inversion', 'ahorro', 'net']) assert.equal(r.shares.reduce((n, row) => n + row[key], 0), r[key]);
});
test('los gastos sin ingresos producen déficit sin dividir entre cero', () => {
  const data = budget(); data.ingresos.forEach(row => row.amount = 0);
  const r = calculate(data);
  assert.equal(r.net, -4800000);
  assert.equal(r.allocated, 0);
  assert.ok(r.shares.every(row => Number.isFinite(row.net) && row.ratio === 0));
});
test('el gasto excesivo aparece como saldo negativo', () => {
  const data=budget();data.gastos[0].amount=7000000;
  const r=calculate(data);assert.equal(r.net,-2800000);assert.ok(r.allocated>100);
});
test('un presupuesto vacío tiene saldo y asignación cero', () => {
  const data=budget();for(const key of ['ingresos','gastos','inversion','ahorro'])data[key].forEach(row=>row.amount=0);
  const r=calculate(data);assert.equal(r.net,0);assert.equal(r.allocated,0);
});
test('solo se recuperan copias con montos, mes y conceptos válidos', () => {
  assert.equal(validState(budget()),true);
  const invalidMonth=budget();invalidMonth.month='2026-99';assert.equal(validState(invalidMonth),false);
  const invalidAmount=budget();invalidAmount.gastos[0].amount=Infinity;assert.equal(validState(invalidAmount),false);
  const negative=budget();negative.gastos[0].amount=-1;assert.equal(validState(negative),false);
  const empty=budget();empty.ingresos=[];assert.equal(validState(empty),false);
});
test('se entienden montos COP y el archivo contiene JavaScript válido', () => {
  assert.equal(parseAmount('$ 4.500.000'),4500000);
  assert.equal(parseAmount(''),0);
  for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)){
    if(!match[0].includes('application/json')) new Script(match[1]);
  }
});
