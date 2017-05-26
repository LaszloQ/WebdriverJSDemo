
  var registration = {

    firstName: "//input[@name='first_name']",
    lastName: "//input[@name='last_name']",

    maritalStatus: {
      single: "//input[@value='single']",
      married: "//input[@value='married']",
      divorced: "//input[@value='divorced']"
    },

    hobby: {
      dance: "//input[@value='dance']",
      reading: "//input[@value='reading']",
      cricket: "//input[@value='cricket ']",
    },

    country: {
      romania: "//option[@value='Romania']",
    },

    birth: {
      month: {
        may: "//select[@id='mm_date_8']/option[@value='5']",
      },
      day: {
        21: "//select[@id='dd_date_8']/option[@value='21']",
      },
      year: {
        1988: "//select[@id='yy_date_8']/option[@value='1988']",
      }
    },

    phone: "//input[@name='phone_9']",
    username: "//input[@name='username']",
    email: "//input[@name='e_mail']",
    uploadPicture: "//input[@id='profile_pic_10']",
    description: "//textarea[@id='description']",
    password: "//input[@name='password']",
    passwordConfirm: "//input[@id='confirm_password_password_2']",
    submit: "//input[@type='submit']",
    confirmation: "//p[.='Thank you for your registration']",
  }

  module.exports = registration;
