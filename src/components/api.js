export const logo = (id,di) => {
    Bmob.initialize(id,di);
    var GameScore = Bmob.Object.extend("GameScore");
    var gameScore = new GameScore();
    gameScore.set("score", 1337);
    gameScore.save(null, {
        success: function(object) {
        console.log('ok')
        },
        error: function(model, error) {
        console.log('no')
        }
    });
}