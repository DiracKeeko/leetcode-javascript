class Axios {
  constructor(baseURL) {
    this.baseURL = baseURL;
    // 其他配置...
  }

  get(url) {
    // 发送 GET 请求...
    const newUrl = this.baseURL + url;
    console.log(newUrl);
    return newUrl;
  }

  post(url, data) {
    // 发送 POST 请求...
  }

  // 其他方法...
}

class AxiosFactory {
  create(baseURL) {
    return new Axios(baseURL);
  }
}

const axiosFactory = new AxiosFactory();
export default axiosFactory;

/* 
  Axios 类是表示一个 Axios 实例的类，它可以执行 GET、POST 等请求。
  
  AxiosFactory 类是工厂类，它提供了 create 方法用于创建 Axios 实例。
  
  axiosFactory 实例化了 AxiosFactory 类，并导出了该实例。
*/

// 引入
// import axiosFactory from './axiosFactory';

// 创建不同 baseURL 的 Axios 实例
const instance1 = axiosFactory.create("https://api.example.com");
const instance2 = axiosFactory.create("https://api.anotherexample.com");

instance1
  .get("/data1")
  .then((response) => {
    console.log("Response from instance1:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

instance2
  .get("/data2")
  .then((response) => {
    console.log("Response from instance2:", response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
