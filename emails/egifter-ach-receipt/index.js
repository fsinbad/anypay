import { readFileSync } from 'fs';
import { join } from 'path';
import * as Handlebars from 'handlebars';

let body = readFileSync(join(__dirname, 'email.html'));

let template = Handlebars.compile(body.toString());

export default {

  title: "ACH Transfer Sent From Anypay",

  template,

  body: template({})

}

