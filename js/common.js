(function () {

	var rcheckableType = (/^(?:checkbox|radio)$/i);
	var rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

	$.fn.myFunc = function () {
		return this.map(function() {

				// Can add propHook for "elements" to filter or add form elements
				var elements = $.prop(this, "elements");
				return elements ? $.makeArray(elements) : this;
			})
			//.filter(function() {
			//  var type = this.type;

			//  // Use .is( ":disabled" ) so that fieldset[disabled] works
			//  return this.name && !$(this).is(":disabled") &&
			//    rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
			//    (this.checked || !rcheckableType.test(type));
			//})
			.map(function(i, elem) {
				var val = $(this).val();

				return val == null ?
					null :
					$.isArray(val) ?
					$.map(val, function(val) {
						return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
					}) :
					{ name: elem.name, value: val.replace(rCRLF, "\r\n") };
			}).get();
		//.get();
	}

	$.fn.serializeObject = function() {
		var o = {};
		var a = this.myFunc();

		$('#result2').text("a - " + a);

		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || 'false');
			} else {
				o[this.name] = this.value || 'false';
			}
		});
		return o;
	};

	$(function() {
		$('.myForm').submit(function () {
			$('#result').text(JSON.stringify($('.myForm').serializeObject()));
			return false;
		});
	});
})();

