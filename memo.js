var webMemo = new class{
	constructor(){
		this.memos = JSON.parse(localStorage.getItem("memos"))
		this.current = localStorage.getItem("current")
		if (this.memos==null)this.memos={}
	}
	onevent(){
		var keys=Object.keys(this.memos)
		var memolist=document.querySelector("#memolist")
		var res=""
		for (var i=0;i<keys.length;i++){
			res+=`<option>${keys[i]}</option>`
		}
		memolist.innerHTML=res
		localStorage.setItem( "memos",JSON.stringify( this.memos ) )
		localStorage.setItem( "current",JSON.stringify( this.current ) )
	}
	save(){
		var key=document.querySelector("#input_MemoList").value
		if (key=="")key="無題"
		this.current=key
		this.memos[key]=document.querySelector("#memo_box").innerHTML
		this.onevent()
	}
	load(){
		var key=document.querySelector("#input_MemoList").value
		if (key=="")key="無題"
		this.current=key
		document.querySelector("#memo_box").innerHTML=this.memos[key]
		this.onevent()
	}
	delete(){
		var key=document.querySelector("#input_MemoList").value
		if (key=="")key="無題"
		this.current="無題"
		document.querySelector("#memo_box").innerHTML=""
		document.querySelector("#input_MemoList").value=""
		delete this.memos[key]
		this.onevent()
	}
	paste(a,b){
		var element = document.createElement("div")
		var text=b.clipboardData.getData('text/html')
		console.log(b.clipboardData.getData('text/html'))
		element.innerHTML=text
		text=element.innerText
		text=text.replace(/[<>&"'`]/g, (match) => {
      		var _escape = {
        		'<': '&lt;',
        		'>': '&gt;',
        		'&': '&amp;',
        		'"': '&quot;',
        		"'": '&#39;',
        		'`': '&#x60;'
    		};
    		return _escape[match];
    	});
		document.execCommand('insertText', false, text);
	}
}