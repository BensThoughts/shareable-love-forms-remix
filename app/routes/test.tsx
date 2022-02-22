import { ActionFunction, LinksFunction, LoaderFunction, redirect } from 'remix';
import { Form, json } from 'remix';
import Label from '~/components/FormElements/Label';

import SelectMenu from '~/components/FormElements/SelectMenu';

export const links: LinksFunction = () => {
  return [
  ]
}

export const loader: LoaderFunction = async ({
  request,
}) => {
  const formName = 'Non Escalator Relationship';
  return formName;
}

type ActionData = {
  formError?: string;
}

const badRequest = (data: ActionData) => json(data, { status: 400 });

export const action: ActionFunction = async ({
  request,
}) => {
  const form = await request.formData();
  console.log(form);
  const tSelect = form.get('headless-select');
  console.log(tSelect);
  return redirect('/test')
}

const options = [
  {value: 'N/A', label: 'N/A'},
  {value: 'MustHave', label: 'Must Have'},
  {value: 'LikeToHave', label: 'Like to Have'},
  {value: 'Maybe', label: 'Maybe'},
  {value: 'OffLimits', label: 'Off Limits'}
]

const simpleOptions = [
  'N/A',
  'Must Have',
  'Like To Have',
  'Maybe',
  'Off Limits',
]

export default function TestRoute() {
  return (
    <div className="flex flex-col items-center gap-3 h-screen">
      <Form method='post' name="test-form" id="test-form">
        <div>
          <Label label="Test Select" tooltipText="This is a test of the select menu" />
          <SelectMenu options={simpleOptions} name="headless-select" initialValue="N/A" />
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </Form>
    </div>
  )
}