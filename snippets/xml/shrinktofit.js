function shrinktofit(){
	var iframe, doc, body, html, W

	iframe=I.frameElement
	doc=I.document

	doc.onreadystatechange=
	iframe.onreadystatechange=
	function(){
		if (this.readyState=='complete'){
			this.onreadystatechange=null
			b4stf()
		}
	}
	doc.onreadystatechange()
	iframe.onreadystatechange()

	function b4stf(){
		var BB
		body= doc.body
		html= doc.documentElement
		b4stf=function(){
			var bb=BB
			BB=body.scrollHeight
			if (bb!=BB || BB<=1) I.setTimeout(b4stf,50)
			else I.setTimeout(b4stf2,20)
		}
		function b4stf2(){
			body.style.fontSize="10pt"
			body.style.overflow=   html.style.overflow=   "visible"
			body.style.visibility= html.style.visibility= "hidden"
			var T,BB
			I.onresize= function(){
				if (T) I.clearTimeout(T)
				T= I.setTimeout(b4stf3,20)
			}
			function b4stf3(){
				I.onresize=null
				var bb=BB
				BB=body.scrollHeight
				if (bb!=BB || BB<=1) I.setTimeout(b4stf3,20)
				else I.setTimeout(stf,20)
			}
			iframe.style.height= Math.max(body.scrollHeight,html.scrollHeight)+4
			iframe.style.width= W= document.styleSheets[0].cssText.match(/FAT[\s\S]*?WIDTH:\s*(\d*)/i)[1]
			iframe.className=""
		}
	}
	function stf(){
		var BB=body.scrollHeight, w=Math.floor(W/2), wmin=1

		iframe.style.height= BB+4
		var T, wait=20
		I.onresize= function(){
			if (T) I.clearTimeout(T)
			T= I.setTimeout( stfnxt,wait )
		}
		function stfnxt(){
			wait=10
			T=null
			if (body.scrollHeight>BB){
				wmin= w+1
				w= Math.max(wmin,Math.floor((W+w)/2))
			}else{	W= w
				w= Math.max(wmin,Math.floor(w/2))
			}
			iframe.style.width= w
			if (w >= W){
				body.style.visibility= html.style.visibility= ""
				iframe.style.height= Math.max(body.scrollHeight,html.scrollHeight)+4
				I.onresize=null
			}
		}
		iframe.style.width= w
	}
}