import setBabyBirth from '../src/components/evaluation/setBabyBirth.vue'; //选择生日
import makePromise from '../src/components/evaluation/makePromise.vue'; //承诺
import beginEvaluation from '../src/components/evaluation/beginEvaluation.vue'; //承诺
import answer from '../src/components/evaluation/answer.vue'; //答题
import finishEvaluation from '../src/components/evaluation/finishEvaluation.vue'; //答题结束
import evaluationResult from '../src/components/evaluation/evaluationResult.vue'; //答题结果

export const EVALUATION = [
  {
    path: '/setBabyBirth',
    name: 'setBabyBirth',
    component: setBabyBirth,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/makePromise',
    name: 'makePromise',
    component: makePromise,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/beginEvaluation',
    name: 'beginEvaluation',
    component: beginEvaluation,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/answer',
    name: 'answer',
    component: answer,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/finishEvaluation',
    name: 'finishEvaluation',
    component: finishEvaluation,
    meta: {
      title: "科米熊",
    },
  },
  {
    path: '/evaluationResult',
    name: 'evaluationResult',
    component: evaluationResult,
    meta: {
      title: "科米熊",
    },
  },
];