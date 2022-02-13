custom your eslint

```js
module.exports = {
	meta: {
		type: ...
	},
	create: function(context) {
		return {
			JSXOpeningElement(node) {
				...
			}
		}
	}
}
```

test your custom eslint rules