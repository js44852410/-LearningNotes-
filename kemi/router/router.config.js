import {ACTIVITY} from './router.activity';
import {FOODS} from './router.foods';
import {LOGIN} from './router.login';
import {PERSONAL} from './router.personal';
import {ORDER} from './router.order';
import {MYTASK} from './router.task';
import {BABY} from './router.baby';
import {CONTACTS} from './router.contacts';
import {EVALUATION} from './router.evaluation';
import {COMMENT} from './router.comment';
import {NEWS} from './router.news';
import {COLLECTION} from './router.collection';
import {TEACHERTEACHER} from './router.teacher-details';
import {RECOMMENTACTIVITY} from './router.recommendActivity';
import {ORGANIZATION} from './router.organization';
import {ARTICLE} from './router.article';
import {OTHERS} from './router.other';

export const ROUTES = [
  ...ACTIVITY,
  ...FOODS,
  ...LOGIN,
  ...PERSONAL,
  ...ORDER,
  ...MYTASK,
  ...BABY,
  ...CONTACTS,
  ...EVALUATION,
  ...COMMENT,
  ...NEWS,
  ...COLLECTION,
  ...TEACHERTEACHER,
  ...RECOMMENTACTIVITY,
  ...ORGANIZATION,
  ...ARTICLE,
  ...OTHERS,
];