<template>
  <div class="newsModify newsModify-animate">
      <div class="news-mod">
        <i class="fa fa-close fa-2x" @click="newClose($event)"></i>
          <div class="news-title">
            <img src="../assets/logonameimg.png" alt="">
            <h2>你猜</h2>
        </div>

        <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <span>01 Example (theme snow)</span>
      </div>
      <md-button target="_blank" 
                 class="md-icon-button"
                 href="https://github.com/surmon-china/vue-quill-editor/tree/master/examples/01-example.vue">
        <md-icon>code</md-icon>
      </md-button>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <div class="quill-code">
          <code class="hljs" v-html="contentCode"></code>
        </div>
      </div>
    </md-card-media>
  </md-card>
      </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
export default {
    name: 'NewsModify',
    components: {quillEditor},
    data() {
      return {
        name: '01-example',
        content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ],
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        }
      }
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        return hljs.highlightAuto(this.content).value
      }
    },
    mounted() {
      console.log('this is my editor', this.editor)
      setTimeout(() => {
        this.content = `<h1 class="ql-align-center">
                          <span class="ql-font-serif" style="background-color: rgb(240, 102, 102); color: rgb(255, 255, 255);"> I am Example 1! </span>
                        </h1>
                        <p><br></p>
                        <p><span class="ql-font-serif">W Can a man still be brave if he's afraid? That is the only time a man can be brave. </span></p>
                        <p><br></p>
                        <p><strong class="ql-font-serif ql-size-large">Courage and folly is </strong><strong class="ql-font-serif ql-size-large" style="color: rgb(230, 0, 0);">always</strong><strong class="ql-font-serif ql-size-large"> just a fine line.</strong></p>
                        <p><br></p>
                        <p><u class="ql-font-serif">There is only one God, and his name is Death. And there is only one thing we say to Death: "Not today."</u></p>
                        <p><br></p>
                        <p><em class="ql-font-serif">Fear cuts deeper than swords.</em></p>
                        <p><br></p>
                        <pre class="ql-syntax" spellcheck="false">const a = 10;<br>const editorOption = { highlight: text => hljs.highlightAuto(text).value };</pre>
                        <p><br></p>
                        <p><span class="ql-font-serif">Every flight begins with a fall.</span></p>
                        <p><br></p>
                        <p><a href="https://surmon.me/" target="_blank" class="ql-font-serif ql-size-small" style="color: rgb(230, 0, 0);"><u>A ruler who hides behind paid executioners soon forgets what death is. </u></a></p>
                        <p><br></p>
                        <iframe class="ql-video ql-align-center" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0" height="238" width="560"></iframe>
                        <p><br></p>
                        <p><span class="ql-font-serif">Hear my words, and bear witness to my vow. Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the fire that burns against the cold, the light that brings the dawn, the horn that wakes the sleepers, the shield that guards the realms of men. I pledge my life and honor to the Night’s Watch, for this night and all the nights to come.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">We are born to suffer, to suffer can make us strong.</span></p>
                        <p><br></p>
                        <p><span class="ql-font-serif">The things we love destroy us every time.</span></p>
                        `
      }, 1300)
    }
}
</script>

<style lang="scss">
.quill-code {
border: none;
height: auto;
> code {
    width: 100%;
    margin: 0;
    padding: 1rem;
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0;
    height: 10rem;
    overflow-y: auto;
    resize: vertical;
}
}
.newsModify{
    position: relative;transition:.4s;
    position: fixed;bottom:0;left:0;right:0;margin:auto;
    width:0%;height:0%;opacity: 0;
    background:rgba(23, 21, 21, 0.74);

    .news-mod{
        position: relative;
        border-radius: 5px;
        position: absolute;
        top: 0;overflow-y: auto;
        bottom: 0;
        right: 0;
        left: 0;box-sizing:border-box;padding:15px;
        margin: auto;
        max-width:100%;max-height:100%;
        background:#fff;
        width:80%;height:80%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.35);

        *{
            color:#353535;
        }

                .fa-close{
            cursor: pointer;
            transition:.3s;
            position: absolute;
            right: 15px;
            top: 10px;color:rgb(73, 73, 73);
            z-index:9;
            &:hover{
                color:#ff0000;
            }
        }

        .news-title{
            width:100%;
            text-align:left;
            border-bottom: 1px solid #dedcdc;

            img{
                float: left;
                border-radius: 50%;
                max-height: 1.7rem;
                margin-right: 10px;
                border: 1px solid #ddd;
            }

            h2{
                font-size:20px;
                width: 90%;
            }
        }
    }
}

.newsModify-animate{
    width:100%;height:100%;opacity:1 !important;
}
</style>
