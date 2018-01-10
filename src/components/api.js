/*
    登录
*/
function login(){
    Bmob.initialize('7150849514c91ed37625710a29c91139','243c886d51cc5d468ccef730afe00cba');
}

/*
    @添加一行数据
    @addScore 添加表名 
    @addTitle 列的名字
    @addContent 内容
*/
export const addStatusOne = (score,addTitle,addContent) => {
    login()
    var GameScore = Bmob.Object.extend(addScore);
    var gameScore = new GameScore();

    gameScore.set(addTitle,addContent);
    gameScore.save(null, {
        success: function(object) {
        console.log(object.id ? 'ok' : false)
        },
        error: function(model, error) {
        console.error('添加数据失败')
        }
    });
}

/*
    @删除一列
    @delScore 删除表名
    @delSucc 删除列名
*/
export const delStatus = (delScore,delSucc) => {
    login()
    var GameScore = Bmob.Object.extend(delScore);
    var query = new Bmob.Query(GameScore);
    query.get(delSucc, {
      success: function(object) {
        // The object was retrieved successfully.
        object.destroy({
          success: function(deleteObject) {
          console.log('ok')
          },
          error: function(GameScoretest, error) {
          console.error('no')
          }
        });
      },
      error: function(object, error) {
        console.error('删除失败')
      }
    });
}

/** 
 * @ 获取单个记录
 * @getScore 获取表名
 * @getCloumn 获取行开头名字
 * @getRow 获取列开头名字
 * 
*/
export const getStatus = (getscore,getCloumn,getRow) => {
    var GameScore = Bmob.Object.extend(getscore);
    var query = new Bmob.Query(GameScore);
    query.get(getCloumn, {
      success: function(object) {
        // The object was retrieved successfully.
        console.log('ok'+object.get(getRow))
        return object.get(getRow)
      },
      error: function(object, error) {
        console.log('no')
      }
    });
}

/*
    @ 查询全部记录
    @allscore 表名
*/
export const getallStatus = (allscore) => {
    login()
    var list,get;
    var GameScore = Bmob.Object.extend(allscore);
    var query = new Bmob.Query(GameScore);
    // 查询所有数据
    return query.find({
        success: function(results) {
            return results
        },
        error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
        }
    });
}