import mailgun from 'mailgun-js'

const MAILGUN_KEY = 'key-d0243dd5d428f4342c783297599039ff';
const MAILGUN_DOMAIN = 'reply.vidbeyond.com';

const mg = mailgun({
  apiKey: MAILGUN_KEY,
  domain: MAILGUN_DOMAIN
});

export interface ISendEmail {
  to: string;
  from?: string;
  subject: string;
  html?: string;
  text?: string;
}

export const sendEmail = async (data: ISendEmail): Promise<any> => {
  data.from = 'tech@vidbeyond.com'

  return mg.messages()
    .send(data)
    .then((res) => {
      console.log(res);
    })
    .catch(err => {
      throw err;
    })
}

