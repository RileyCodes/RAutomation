
export default  class RDataStorage {
    static data = {};
    static setData(data)
    {
        RDataStorage.data = {...this.data,data};
    }
    static getData()
    {
        return this.data;
    }
    owner = 'global'
    constructor(owner){
        this.owner = owner;
        const data = {this.owner:}
        RDataStorage.setData()
    }

    get(keyName)
    {
        return RDataStorage.getData()[this.owner][keyName];
    }

    set(keyName,value)
    {
        console.log('1111')
        console.log(RDataStorage.getData())

        RDataStorage.setData(RDataStorage.getData()[this.owner][keyName] = value);
    }

}