import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

//
export const userState = atom({
  key: "user",
  default: ["username", "activationCode"],
  effects_UNSTABLE: [localStorageEffect("user")],
});

// export const loginState = atom({
//   key: "login",
//   default: null,
//   effects_UNSTABLE: [localStorageEffect("login")],
// });

// export const adminState = atom({
//   key: "admin",
//   default: null,
//   effects_UNSTABLE: [localStorageEffect("admin")],
// });

// export const usersState = atom({
//   key: "users",
//   default: [],
//   effects_UNSTABLE: [localStorageEffect("users")],
// });
