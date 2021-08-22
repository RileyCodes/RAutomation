import Store from "./Model/Store";



class Util
{
    static libPath = 'C:\\project\\OpenCVHelper\\x64\\Debug\\ArkBot.dll';
    static request = window.electron.getNativeFunction(this.libPath, 'FromCaller', 'int', ['uint8_t *','uint8_t']);
    static logCB = window.electron.getNativeFunction(this.libPath, 'SetupLogCallback', 'void', [['void', []]]);


    static Request(obj)
    {
        var string = JSON.stringify(obj);
        var bufferSize = string.length;
        var buffer = new Buffer(bufferSize);
        buffer.write(string, 0, "utf-8");

        const bufferPointer = window.electron.getBufferPointer(buffer);
        var result = this.request(bufferPointer,bufferSize);
        console.log('result:'+ result);
    }

    static SetupCallback(cb)
    {
        this.logCB(cb);
    }
}

export default Util;