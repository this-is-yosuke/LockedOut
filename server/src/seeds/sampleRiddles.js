// Arrays
function riddle1() {
    let myArr = ["a", "b", "c", "d"];
    myArr.pop(1);
    console.log(myArr);
};
riddle1();
function riddle2() {
    let myArr = ["c", "a", "t"];
    myArr.shift();
    console.log(myArr);
};
riddle2();
function riddle3() {
    let myArr = ["a", "b", "c", "d"];
    myArr.copyWithin(1, 2, 3);
    console.log(myArr);
};
riddle3();
function riddle4() {
    let myArr = ["a", "b", "c", "d"]
    myArr.splice(1, 3);
    console.log(myArr);
};
riddle4();
// Strings-------------------------------------------
function riddle5() {
    let s = "Ahoy";
    s = s.padStart(7, s.substring(3));
    console.log(s);
};
riddle5();
function riddle6() {
    let s = "You are in an escape room";
    arr = s.split('a');
    console.log(arr);
};
riddle6();
function riddle7() {
    let s = "Hello World";
    s = s.at(-7);
    console.log(s);
};
riddle7();
function riddle8() {
    let s = "Escape Room";
    sub = s.slice(3, 6);
    s = s.replaceAll(sub, "x");
    console.log(s[5]);
};
riddle8();
// Math---------------------------------------------
function riddle9() {
    let a = 5;
    let b = 8;
    let c = Math.abs(a - b);
    let d = a - c;
    console.log(d);
};
riddle9();
function riddle10() {
    let a = 32*2;
    let b = Math.sqrt(a);
    console.log(b);
};
riddle10();
function riddle11() {
    let a = 20;
    let b = Math.floor(a/3);
    console.log(b);
};
riddle11();
function riddle12() {
    let a = 30;
    let b = Math.sqrt(121);
    let c = Math.ceil(a/b);
    console.log(c);
};
riddle12();
// More Math----------------------------------------
function riddle13() {};
riddle13();
function riddle14() {};
riddle14();
function riddle15() {};
riddle15();
function riddle16() {};
riddle16();
function riddle17() {};
riddle17();
function riddle18() {};
riddle18();
function riddle19() {};
riddle19();
function riddle20() {};
riddle20();