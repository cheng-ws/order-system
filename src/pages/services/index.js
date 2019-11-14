import axios from 'axios'
import qs from 'qs'
var axiosAjax = axios.create({
        baseURL:'/api',
        transformRequest: [function (data) { // <--- here 转换数据
             data = qs.stringify(data); // 通过Qs.stringify转换为表单查询参数
            return data;
        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        }
        // headers:{'Content-Tye':'application/json'}
    });
export default {
    //用户登录查询
    async userCheck(params){
        return axiosAjax.post('/user.php',{
             ...params
        } )
    },
    async placeCheck(params){
       return  axiosAjax.post('/place.php',{
            ...params
        }) 
    },
    async upPlace(params){
        return  axiosAjax.post('/upPlace.php',{
            ...params
        }) 
    },
    async myCheck(params){
        return axiosAjax.post('/myPlace.php',{
            ...params
        })
    },
    async removeMyPersonOne(params){
        return axiosAjax.post('/removeMyOne.php',{
            ...params
        })
    },
    async selectMyPerson(params){
        return axiosAjax.post('/selectMyPerson.php',{
            ...params
        })
    },
    async upUserPerson(params){
        return  axiosAjax.post('/upUser.php',{
            ...params
        }) 
    },
    async addUserPerson(params){
        return  axiosAjax.post('/addUser.php',{
            ...params
        }) 
    },
    async getRoleList(params){
        return  axiosAjax.post('/getRole.php',{
            ...params
        }) 
    },
    async addCreateRole(params){
        return  axiosAjax.post('/addRole.php',{
            ...params
        }) 
    },
    async addRolePermission(params){
        return  axiosAjax.post('/addRolePermission.php',{
            ...params
        }) 
    },
    async getRolePermission(params){
        return  axiosAjax.post('/getRolePermission.php',{
            ...params
        }) 
    },

}