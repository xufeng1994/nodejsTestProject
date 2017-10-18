module.exports = {
    select: {
        name: "tab",
        share: {
            css: "#tab-value > option:nth-child(2)"
        },
        ask: {
            css: "#tab-value > option:nth-child(3)"
        },
        job: {
            css: "#tab-value > option:nth-child(4)"
        }
    },

    title: {
        id: "title"
    },
    text: {
        css: '.CodeMirror.cm-s-paper'
        
    },
    textArea:{
        xpath:'//*[@id="create_topic_form"]/fieldset/div/div/div[2]/div[6]/div[2]'
    },
    link: {
        className: "eicon-link",
        title:{
            css:'div:nth-child(1) > div > input[type="text"]'
        },
        linkurl:{
            css:'div:nth-child(2) > div > input[type="text"]'
        },
        submit:{
            className:"btn-primary"
        }
    },
    image: {
        className: "eicon-image"
    },
    submit: {
        css: '//*[@id="create_topic_form"]/fieldset/div/div/div[4]/input'
    }



}