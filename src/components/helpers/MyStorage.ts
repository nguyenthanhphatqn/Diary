import SInfo from 'react-native-sensitive-info';
export default class MyStorage {
    entry_list = "entry_list";
    email = 'email'
    password = 'password'
    setItem(key, value) {
        SInfo.setItem(key, "".concat(value), {});
    }
    getItem(key) {
        return SInfo.getItem(key, {})
    }
    removeItem(key) {
        return SInfo.deleteItem(key, {})
    }
    clearStorage() {
        // return this.rmUserInfo();
    }
    setEntry(entry) {
        this.setItem(this.entry_list, entry)
    }
    getEntry() {
        return this.getItem(this.entry_list)
    }
    setEmail(_email) {
        this.setItem(this.email, _email)
    }
    getEmail() {
        return this.getItem(this.email)
    }
    setPassword(_password) {
        this.setItem(this.password, _password)
    }
    getPassword() {
        return this.getItem(this.password)
    }
}