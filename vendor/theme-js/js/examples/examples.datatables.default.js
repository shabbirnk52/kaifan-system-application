/*
Name: 			Tables / Advanced - Examples
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version: 	4.0.0
*/

(function($) {

	'use strict';

	var datatableInit = function() {

		// $('#datatable-default').dataTable({
		// 	dom: '<"row"<"col-lg-6"l><"col-lg-6"f>><"table-responsive"t>p'
		// });
		$('.table').dataTable({
			// dom: '<"row"<"col-lg-6"l><"col-lg-6"f>><"table-responsive"t>p'
			dom: '<"row"<"col-6"B><"col-6"f><"col-lg-12 ResponsiveTable"t><"col-lg-4 mt-lg-3 mt-0 text-lg-start text-center"l><"col-lg-4 mt-lg-3 mt-0 text-center"i><"col-lg-4 text-lg-end text-center"p>>',
			buttons: [
				{
					extend:    'excelHtml5',
					text:      '<i class="far fa-file-excel"></i>',
					titleAttr: 'Excel'
				}
			]
		});

	};

	$(function() {
		datatableInit();
	});

}).apply(this, [jQuery]);