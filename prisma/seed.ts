import {
  PrismaClient,
  Prisma,
} from '@prisma/client';

const db = new PrismaClient();

async function seed() {
  await db.$connect();
  console.log('connected');

  await Promise.all(
      getUsers().map(({ data }) => {
        return db.user.create({ data });
      }),
  );
  console.log('users created');

  await Promise.all(
      getClerkUsers().map((clerkUser) => {
        return db.clerkUser.upsert({
          where: {
            id: clerkUser.data.id,
          },
          create: clerkUser.data,
          update: clerkUser.data,
        });
      }),
  );
  console.log('clerk users created');

  await Promise.all(
      getForms().map(({ data }) => {
        return db.formState.create({
          data,
        });
      }),
  );
  console.log('forms created');
}

seed()
    .catch((e) => {
    // console.error(e)
      throw e;
    })
    .finally(async () => {
      console.log('disconnect');
      await db.$disconnect();
    });


const DEFAULT_RESPONSE_OPTIONS = ['N/A', 'Must Have', 'Like To Have', 'Maybe', 'Off Limits'];
const DEFAULT_RESPONSE = 'N/A';

const kody: Prisma.UserCreateArgs = {
  data: {
    username: 'kody',
    passwordHash: '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u',
  },
};

const bensthoughts: Prisma.ClerkUserCreateArgs = {
  data: {
    id: 'user_24QuYw99VRLmixi9z2zWEWg8vJ8',
  },
};

const getUsers = () => {
  return [
    kody,
  ];
};

const getClerkUsers = () => {
  return [
    bensthoughts,
  ];
};

const nonEscalatorForm: Prisma.FormStateCreateArgs = ({
  data: {
    name: 'Non Escalator Form',
    version: 0,
    description: '',
    fieldGroups: {
      create: [
        {
          label: 'Commitment',
          fields: {
            create: [
              {
                label: 'Marriage',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sharing pet(s)',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Pregnancy/children together',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Co-parenting children from other partners',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Having a key',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Cohabitation',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Home ownership',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Prioritization over other partners',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Relationship labels',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Planning for the future',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Expectation of long term involvement',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Commitment to working through challenges',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Power of attorney/wills',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Support through health challenges',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Physical Intimacy',
          fields: {
            create: [
              {
                label: 'Physical affection',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'PDA',
                tooltipText: 'PDA: Public Display of Affection',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Compatible sex drive',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sexual chemistry',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Orgasms',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Kissing',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Oral sex',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Manual sex (fingering)',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Mutual masturbation',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Penetration',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Using sex toys',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Condom/barrier use',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Regular STI testing',
                tooltipText: 'STI: Sexually Transmitted Infection',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Kinky stuff',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Threesomes or group sex',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Emotional Intimacy',
          fields: {
            create: [
              {
                label: 'Expressing happiness and joy',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Offering support in hard times',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sharing vulnerable feelings',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Saying "I love you"',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sharing stories about past',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sharing hopes for future',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Knowing personal likes/dislikes (eg favorite food)',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Using pet names',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Sharing about mental health challenges',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Supporting mental health work',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Communication',
          fields: {
            create: [
              {
                label: 'Daily or frequent check ins',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Texting',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Phone / video calls',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Discussing work and hobbies',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Discussing family',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Discussing friends',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Discussing partners',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Discussing politics and current events',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Ability to express disagreement and hurt feelings',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Ability to address and resolve conflict',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Radical honesty',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Financial Management',
          fields: {
            create: [
              {
                label: 'Shared bank account(s)',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Mutual contributions to vacation/activity fund',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Financial support',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Large gifts',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Complete financial integration',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Social Integration',
          fields: {
            create: [
              {
                label: 'Meeting metamours',
                tooltipText: `A metamour is your lover's other lover`,
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Meeting children',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Meeting parents/siblings/extended family',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Meeting friends',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Spending time as a couple with friends/family',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Positive relationships with metamours',
                tooltipText: `A metamour is your lover's other lover`,
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Serving as +1 for social events',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Presenting as a couple in public settings',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Following on social media',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Presenting as a couple on social media',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Presenting as a couple in professional settings',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Joint vacations with family/ metamours',
                tooltipText: `A metamour is your lover's other lover`,
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Quality Time',
          fields: {
            create: [
              {
                label: 'Regularly scheduled time together',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Date nights',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Spending the night',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Shared hobbies or activities',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Vacations together as couple',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Calendar mgt/scheduling initiation',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
        {
          label: 'Autonomy',
          fields: {
            create: [
              {
                label: 'Balance of time together and apart',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Support to pursue independent interests',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Maintaining independent friendships',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Maintaining independent romantic relationships',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Equal distribution of relationship power',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
              {
                label: 'Alone time',
                type: 'selectField',
                valueOptions: DEFAULT_RESPONSE_OPTIONS,
                defaultValue: DEFAULT_RESPONSE,
              },
            ],
          },
        },
      ],
    },
  },
});

const getForms = () => {
  return [
    nonEscalatorForm,
  ];
};


//   [
//       {
//         label: 'Commitment',
//         fields: [
//           {
//             label: 'Marriage',
//             type: 'selectField',
//             valueOptions: DEFAULT_RESPONSE_OPTIONS,
//             value: DEFAULT_RESPONSE
//           },
//           {
//             label: 'Sharing pet(s)',
//             type: 'selectField',
//             valueOptions: DEFAULT_RESPONSE_OPTIONS,
//             value: DEFAULT_RESPONSE,
//           },
//           {
//             label: 'Pregnancy/children together',
//             type: 'selectField',
//             valueOptions: DEFAULT_RESPONSE_OPTIONS,
//             value: DEFAULT_RESPONSE,
//           },
//         ]
//       },
//       {
//         label: 'Physical Intimacy',
//         fields: [
//             {
//               label: 'Physical affection',
//               type: 'selectField',
//               valueOptions: DEFAULT_RESPONSE_OPTIONS,
//               value: DEFAULT_RESPONSE,
//             },
//             {
//               label: 'PDA',
//               // tooltipText: 'PDA: Public Display of Affection',
//               type: 'selectField',
//               valueOptions: DEFAULT_RESPONSE_OPTIONS,
//               value: DEFAULT_RESPONSE,
//             },
//             {
//               label: 'Compatible sex drive',
//               type: 'selectField',
//               valueOptions: DEFAULT_RESPONSE_OPTIONS,
//               value: DEFAULT_RESPONSE,
//             },
//             {
//               label: 'Sexual chemistry',
//               type: 'selectField',
//               valueOptions: DEFAULT_RESPONSE_OPTIONS,
//               value: DEFAULT_RESPONSE,
//             }
//           ]
//       }
//     ]
// }


// TODO: Delete connectOrCreate Version
// const nonEscalatorForm = (userName: string): Prisma.FormStateCreateArgs => ({
//   data:  {
//     name: 'Non Escalator Form',
//     version: 0,
//     description: '',
//     fieldGroups: {
//       connectOrCreate: [
//         {
//           where: {
//             label_formName: {
//               label: 'Commitment',
//               formName: 'Non Escalator Form',
//             }
//           },
//           create:           {
//             label: 'Commitment',
//             fields: {
//               connectOrCreate: [
//                 {
//                   where: {
//                     id: 'Commitment'
//                   },
//                   create: {
//                     label: 'Marriage',
//                     type: 'selectField',
//                     valueOptions: DEFAULT_RESPONSE_OPTIONS,
//                     defaultValue: DEFAULT_RESPONSE,
//                     fieldValuesForUsers: {
//                       connectOrCreate: [
//                         {
//                           where: {
//                             id: userName,
//                           },
//                           create: {
//                             userName: kody.data.username,
//                             value: DEFAULT_RESPONSE,
//                           }
//                         },
//                         {
//                           where: {
//                             id: 'ben',
//                           },
//                           create: {
//                             userName: 'ben',
//                             value: DEFAULT_RESPONSE,
//                           }
//                         }
//                       ]
//                     }
//                   }
//                 },
//                 {
//                   where: {
//                     id: 'Commitment',
//                   },
//                   create: {
//                     label: 'Sharing pet(s)',
//                     type: 'selectField',
//                     valueOptions: DEFAULT_RESPONSE_OPTIONS,
//                     defaultValue: DEFAULT_RESPONSE,
//                   }
//                 },
//               ]
//             }
//           },
//         }

//       ]
//     }
//   }
// });
