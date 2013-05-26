
// startup
Presentation.repository.refresh();

// setup email handling
$$email.defaults = {
  user : $$config.smtp_username,
  password : $$config.smtp_password,
  host : $$config.smtp_host,
  ssl : true
};