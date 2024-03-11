"use strict";

$(document).ready(function () {

  showLoader();
  EnableImageCompressionHook();
  if ($("html").attr("dir") == "rtl") {
    $(".nano-content").css("left", $(".nano-content").css("right"));
    $(".nano-content").css("right", "");
  }
  initiOS7SwitchEvents();
  registeriOS7SwitchEvents();
  advancedExpandMenuItem();
  initializeSelect2();
  initRadioButtonEvents();
  initUploadPreview();
  addTextAreaCounters();
  addInputFieldCounters();
  sidebarLeftCollapse();
  clearDatepickerHelper();
  // Demo Loader Code
  setTimeout(function () {
    hideLoader();
  }, 200);

  $(".generate-date").html(new Date().getFullYear());
  console.log("document ready");
});
$(".password-peeker").on("click", function () {
  if ($(this).closest(".password-field").find("input").attr("type") == "password") {
    $(this).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
    $(this).closest(".password-field").find("input").attr("type", "text");
  }
  else {
    $(this).find("i").removeClass("fa-eye-slash").addClass("fa-eye");
    $(this).closest(".password-field").find("input").attr("type", "password");
  }
});

function clearDatepickerHelper() {
  $(".clear-datepicker").click(function () {
    $(this).siblings("[data-plugin-datepicker],.input-group").find("input").val("");
  });
}

function addTextAreaCounters() {
  if ($("textarea.hasMaxLength").length > 0) {
    $("textarea.hasMaxLength").each(function () {
      $(this).next().find(".current-count").html($(this).val().length);
      $(this).next().find(".maximum-count").html($(this).attr("maxlength"));
      $(this).on("keyup", function () {
        $(this).next().find(".current-count").html($(this).val().length);
      })
    });
  }
}
function addInputFieldCounters() {
  if ($("input[maxlength]").length > 0) {
    $("input[maxlength]").each(function () {
      $(this).next().find(".current-count").html($(this).val().length);
      $(this).next().find(".maximum-count").html($(this).attr("maxlength"));
      $(this).on("keyup", function () {
        $(this).next().find(".current-count").html($(this).val().length);
      })
    });
  }
}

function EnableImageCompressionHook() {
  $(".enable-compression").on("change", function (e) {
    const file = e.target.files[0];
    var originalSize = 0;
    var newSize = 0;
    if (!file) {
      return;
    }
    originalSize = file.size;
    new Compressor(file, {
      quality: 0.6,

      // The compression process is asynchronous,
      // which means you have to access the `result` in the `success` hook function.
      success(result) {
        const formData = new FormData();

        // The third parameter is required for server
        formData.append('file', result, result.name);

        // This is new Image File
        var outputFile = new File([result], result.name);
        newSize = outputFile.size;

        // For Displaying it in Preview
        var image = $(e.target).closest(".row").find(".preview-image");
        image.attr("src", URL.createObjectURL(outputFile));

        // Compare Sizes for Demo
        console.log("****************");
        console.log("Original File Size: " + originalSize);
        console.log("New File Size: " + newSize);
        console.log("Saved Size Percentage: " + (((newSize / originalSize) * 100) - 100) + "%");
        console.log("****************");

        // Temporary Download for Demo
        // var url  = URL.createObjectURL(result);
        // var newWindow = window.open(url, "popupWindow", "width=600,height=600,scrollbars=yes");
      },
      error(err) {
        console.log(err.message);
      },
    });
  });
}

$(document).on('AdvancedExpandMenuItemDone', function () {
  generateBreadcrumbs();
});

// Gets Browser URL and Compares to the Side Menu and assigns Active Class.
function advancedExpandMenuItem() {
  var UrlToFind = "";
  if (document.location.pathname.match(/[^\/]+$/) != null)
    UrlToFind = document.location.pathname.match(/[^\/]+$/)[0];
  else
    UrlToFind = "/";

  if (UrlToFind != "/" && UrlToFind != null) {
    var htmlname = UrlToFind;
    $('#menu').find("a[href$='" + htmlname + "'],a[href$='" + htmlname.substring(1) + "']").parent().addClass('nav-active');
    $('#menu').find("a[href$='" + htmlname + "'],a[href$='" + htmlname.substring(1) + "']").parents('.nav-parent').addClass('nav-expanded nav-active');
  }
  else {
    var htmlname = "/";
    $('#menu').find("a[href$='" + htmlname + "'],a[href$='index.html'],a[href$='" + htmlname.substring(1) + "']").parent().addClass('nav-active');
    $('#menu').find("a[href$='" + htmlname + "'],a[href$='index.html'],a[href$='" + htmlname.substring(1) + "']").parents('.nav-parent').addClass('nav-expanded nav-active');
  }
  $(document).trigger("AdvancedExpandMenuItemDone");
}
function sidebarLeftCollapse() {
  if (localStorage.getItem("sidebar-left-collapsed") == null) {
    $('html').addClass('sidebar-left-collapsed');
    return
  }
  if (localStorage.getItem("sidebar-left-collapsed") == "true") {
    if (!$('html').hasClass('sidebar-left-collapsed')) {
      $('html').addClass('sidebar-left-collapsed');
    }
  }
  else {
    if ($('html').hasClass('sidebar-left-collapsed')) {
      $('html').removeClass('sidebar-left-collapsed');
    }
  }
}
$('[data-fire-event="sidebar-left-toggle"]').click(function () {
  setTimeout(function () {
    if ($('html').hasClass('sidebar-left-collapsed')) {
      localStorage.setItem("sidebar-left-collapsed", true);
    }
    else {
      localStorage.setItem("sidebar-left-collapsed", false);
    }
    console.log(localStorage.getItem("sidebar-left-collapsed"));
  }, 500);

});

function generateBreadcrumbs() {
  $('#menu').find('.nav-active').each(function () {
    var href = $(this).find(".nav-link").first().attr("href");
    var name = $(this).find(".nav-link span:not(.badge)").first().text();
    if (href != "#") {
      name = $(this).children().find("span:not(.badge)").first().text().trim();
    }
    $('ol.breadcrumbs').append('<li><a href="' + href + '" class="fs-6 fw-bold text-decoration-none">' + name + '</a></li>');
  });
}
function showLoader() {
  $('.loader-container').show();
}
function hideLoader() {
  $('.loader-container').hide();
}

$(".language-switch").click(function () {
  SwitchRTL()
});
$(document).ready(function () {
  if ($('html').attr('dir') == 'rtl') {
    $(".language-switch span").html("English");
  }
});
function SwitchRTL() {
  // console.log(window.location.pathname);
  if (window.location.pathname == "/") {
    location.href = '/index-rtl.html';
  }
  else {
    if (!window.location.pathname.endsWith("html")) {
      location.href = window.location.pathname + 'index-rtl.html';
    }
    else {
      if (!window.location.pathname.includes('-rtl.html')) {
        location.href = window.location.pathname.slice(0, -5) + '-rtl.html';
      }
      else {
        location.href = window.location.pathname.slice(0, -9) + '.html';
      }
    }
  }
}

function initializeSelect2() {
  if ($('body').css('direction') == 'rtl') {
    $(document).find('select:not(.no-search):not(.select2-hidden-accessible)').each(function () {
      if ($(this).closest(".modal").length) {
        var modalID = "#" + $(this).closest(".modal").attr("id");
        $(this).select2({
          dir: "rtl",
          theme: 'bootstrap',
          dropdownParent: modalID
        });
      }
      else {
        $(this).select2({
          dir: "rtl",
          theme: 'bootstrap'
        });
      }
    });
    $(document).find('select.no-search:not(.select2-hidden-accessible)').each(function () {
      if ($(this).closest(".modal").length) {
        var modalID = "#" + $(this).closest(".modal").attr("id");
        $(this).select2({
          dir: "rtl",
          theme: 'bootstrap',
          dropdownParent: modalID,
          minimumResultsForSearch: Infinity
        });
      }
      else {
        $(this).select2({
          dir: "rtl",
          theme: 'bootstrap',
          minimumResultsForSearch: Infinity
        });
      }
    });
  } else {
    $(document).find('select:not(.no-search):not(.select2-hidden-accessible)').each(function () {
      if ($(this).closest(".modal").length) {
        var modalID = "#" + $(this).closest(".modal").attr("id");
        $(this).select2({
          theme: 'bootstrap',
          dropdownParent: modalID
        });
      }
      else {
        $(this).select2({
          theme: 'bootstrap'
        });
      }
    });
    $(document).find('select.no-search').each(function () {
      if ($(this).closest(".modal").length) {
        var modalID = "#" + $(this).closest(".modal").attr("id");
        $(this).select2({
          theme: 'bootstrap',
          dropdownParent: modalID,
          minimumResultsForSearch: Infinity
        });
      }
      else {
        $(this).select2({
          theme: 'bootstrap',
          minimumResultsForSearch: Infinity
        });
      }
    });
  }
}

$(function () {
  if ($("#btnPrint").length > 0) {
    $("#btnPrint").click(function (e) {
      e.preventDefault()
      var contents = $("#dvContents").html();
      var frame1 = $('<iframe />');
      frame1[0].name = "frame1";
      frame1.css({ "position": "absolute", "top": "-1000000px" });
      $("body").append(frame1);
      var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
      frameDoc.document.open();
      //Create a new HTML document.
      frameDoc.document.write('<html><head><title>DIV Contents</title>');
      frameDoc.document.write('</head><body>');
      //Append the external CSS file.
      frameDoc.document.write('<link href="assets/css/theme.css" rel="stylesheet" type="text/css" />');
      frameDoc.document.write('<link href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@400;700&display=swap" rel="stylesheet" type="text/css" />');

      //Append the DIV contents.
      frameDoc.document.write(contents);
      frameDoc.document.write('</body></html>');
      frameDoc.document.close();
      setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        // frame1.remove();
      }, 500);
    });
  }
  // Form language switcher for arabi form
  $(".form-language-switcher").click(function () {
    if ($(this).attr("lang") == "en") {
      $(".form-parent").addClass("dir-ltr").removeClass("dir-rtl");
      $(".form-parent-rtl").addClass("dir-ltr").removeClass("dir-rtl");
      $("body").removeClass("has-rtl-layout");
      $(".form-language-switcher").attr("lang", "ar");
      $(".form-language-switcher").html("عربي");
    }
    else {
      $(".form-parent").addClass("dir-rtl").removeClass("dir-ltr");
      $(".form-parent-rtl").addClass("dir-rtl").removeClass("dir-ltr");
      $("body").addClass("has-rtl-layout");
      $(".form-language-switcher").attr("lang", "en");
      $(".form-language-switcher").html("English");
    }
    updateTranslations($(this));
    initializeSelect2();
  });
});

function updateTranslations(that) {
  debugger;
  var requiredTemplate = `<span class="text-danger">*</span>`;
  $("[data-translation],[data-translation-placeholder]").each(function () {
    if ($(this).find("span").length == 0) {
      var translation = $(this).data("translation");
      var translation_placeholder = $(this).data("translation-placeholder");
      var innerHTML = $(this).html();
      var innerPlaceholder = $(this).attr("placeholder");

      $(this).html(translation);
      $(this).attr("placeholder", translation_placeholder);
      $(this).data("translation", innerHTML);
      $(this).data("translation-placeholder", innerPlaceholder);
    }
    else {
      var translation = $(this).data("translation");
      var translation_placeholder = $(this).data("translation-placeholder");
      var innerHTML = $($(this).contents()[0]).text();
      var innerPlaceholder = $(this).attr("placeholder");

      $(this).html(translation + requiredTemplate);
      $(this).attr("placeholder", translation_placeholder);
      $(this).data("translation", innerHTML);
      $(this).data("translation-placeholder", innerPlaceholder);
    }
  });
}

$(document).ready(function () {
  //Enable Tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  //Advance Tabs. Should be looked at by the developers. They might not want to use the entire code.
  $(".wizard-next").click(function () {
    const nextTabLinkEl = $(".nav-tabs .active")
      .closest("li")
      .next("li")
      .find("a")[0];
    // Start: This code, for example, is added as part of the demo.
    // Developers should write their own logic below
    var done = true;
    $(".tab-pane.active").find("[required]").each(function () {
      if ($(this).val() == "" || $(this).val() == null) {
        done = false;
      }
    });
    if (!done) {
      $(".nav-tabs .active").addClass("warning").removeClass("done");
      $(".nav-tabs .nav-link.active").closest(".nav-item").addClass("warning").removeClass("done");
      // $(".nav-tabs .active").prevAll().addClass("done warning");
      $(".nav-tabs .active").nextAll().removeClass("done warning");
    }
    else {
      $(".nav-tabs .active").addClass("done").removeClass("warning");
      $(".nav-tabs .nav-link.active").closest(".nav-item").addClass("done").removeClass("warning");
      // $(".nav-tabs .active").prevAll().addClass("done");
      $(".nav-tabs .active").nextAll().removeClass("done warning");
    }
    // End: This code, for example, is added as part of the demo.
    const nextTab = new bootstrap.Tab(nextTabLinkEl);
    nextTab.show();
  });

  $(".wizard-previous").click(function () {
    const prevTabLinkEl = $(".nav-tabs .active")
      .closest("li")
      .prev("li")
      .find("a")[0];
    // Start: This code, for example, is added as part of the demo.
    $(".nav-tabs .active").removeClass("done");
    $(".nav-tabs .active").closest(".nav-item").removeClass("done");
    // End: This code, for example, is added as part of the demo.
    const prevTab = new bootstrap.Tab(prevTabLinkEl);
    prevTab.show();
    $(".nav-tabs .active").closest(".nav-item").removeClass("done");

  });
});

// $(function () {
//   $("input,textarea,select").on("change", function () {
//     if ($(this).val() != null || $(this).val() != "")
//       $(this).attr("data-changed", "true");
//   });
// });

// function getChangedFields() {
//   var ChangedFields = [];
//   $("[data-changed=true]").each(function () {
//     var _Name = $(this).attr("name");
//     var _ID = $(this).attr("id");
//     var _value = $(this).val();
//     var _type = $(this).attr("type") ? $(this).attr("type") : $(this).prop("tagName");
//     ChangedFields.push({ "name": _Name, "id": _ID, "value": _value, "type": _type });
//   });
//   return ChangedFields;
// }

function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    }
  }
  return false;
};

function initiOS7SwitchEvents() {
  $("[data-plugin-ios-switch]").each(function () {
    if ($(this).attr("data-switch-disable") != "" && $(this).attr("data-switch-disable") != null) {
      if ($(this).is(":checked")) {
        $(`[data-content-disable=${$(this).attr("data-switch-disable")}]`).attr("disabled", "true");
      }
      else {
        $(`[data-content-disable=${$(this).attr("data-switch-disable")}]`).removeAttr("disabled");
      }
    }
    if ($(this).attr("data-switch-display") != "" && $(this).attr("data-switch-display") != null) {
      if ($(this).is(":checked")) {
        $(`[data-content-display=${$(this).attr("data-switch-display")}]`).show(200);
      }
      else {
        $(`[data-content-display=${$(this).attr("data-switch-display")}]`).hide(200);
      }
    }
  });
}

function registeriOS7SwitchEvents() {
  $(document).on("change", "[data-plugin-ios-switch]", function () {
    if ($(this).attr("data-switch-disable") != "" && $(this).attr("data-switch-disable") != null) {
      if ($(this).is(":checked")) {
        $(`[data-content-disable=${$(this).attr("data-switch-disable")}]`).attr("disabled", "true");
      }
      else {
        $(`[data-content-disable=${$(this).attr("data-switch-disable")}]`).removeAttr("disabled");
      }
    }
    if ($(this).attr("data-switch-display") != "" && $(this).attr("data-switch-display") != null) {
      if ($(this).is(":checked")) {
        $(`[data-content-display=${$(this).attr("data-switch-display")}]`).show(200);
      }
      else {
        $(`[data-content-display=${$(this).attr("data-switch-display")}]`).hide(200);
      }
    }
  });
}

function initRadioButtonEvents() {
  $("[data-radio-conditional-display][name=" + $(this).attr("name") + "]").each(function () {
    $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").hide();
  });

  $("[data-radio-conditional-display]").each(function () {
    if ($(this).is(":checked")) {
      $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").show();
    }
    else {
      $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").hide();
    }
  });
  $(document).on("change", "[data-radio-conditional-display]", function () {

    $("[data-radio-conditional-display][name=" + $(this).attr("name") + "]").each(function () {
      $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").hide();
    });

    if ($(this).is(":checked")) {
      $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").show();
    }
    else {
      $("[data-content-display=" + $(this).attr("data-radio-conditional-display") + "]").hide();
    }
  });
}

function initUploadPreview() {
  $(document).on("change", "input[type=file]", function (e) {
    $(this).closest(".row").find(".preview-image").attr("src", URL.createObjectURL(e.target.files[0]));
  });
}