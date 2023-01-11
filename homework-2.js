console.log("Record 1");

setTimeout(() => {
  console.log("Record 2");
  Promise.resolve().then(() => {
    setTimeout(() => {
      console.log("Record 3");
      Promise.resolve().then(() => {
        console.log("Record 4");
      });
    });
  });
});

console.log("Record 5");

Promise.resolve().then(() =>
  Promise.resolve().then(() => console.log("Record 6"))
);

/* вывод в консоль:
Record 1
Record 5
Record 6
Record 2
Record 3
Record 4

1. Record 1 - синхронная операция

p/s/ callback-функция функции setTimeout сразу же отложится до конца выполнения скрипта. (т.к. время не указано) и запустится последней в call-stack.

2. Record 5 - тоже синхронная 

операция промис из 17 строки зарезолвится и cb из then провалится в очередь микротасков, очередь микротасков не пуста - выполнится cb и зарезолвится внутреннний промис и
cb отправится в очередь микротасков, очередь микротасков не пуста - выполнится cb.

3. Record 6 - синхронная операция коллбэка вложенного промиса.

далеет setTimeout
4. Record 2 - синхронная операция в cb setTimeout.

и очередь промисов
5. Record 3 
6. Record 4
*/
