import { Form } from 'remix';
import RemixAnimatedLink from '~/components/RemixAnimatedLink';
import RemixLink from '~/components/RemixLink';
import RemixLinkButton from '~/components/RemixLinkButton';

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1 className="text-3xl font-bold">Welcome to Remix</h1>
      <div className="flex flex-col gap-2">
        <RemixAnimatedLink to="/">Home</RemixAnimatedLink>
        <RemixLink to="/non-escalator">Non Escalator Form</RemixLink>
        <RemixLinkButton to="home">Home</RemixLinkButton>
      </div>

      {/* <Form>
        <div className="inline-block relative w-64">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
            State
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="grid-state"
          >
            <option>N/A</option>
            <option>Must Have</option>
            <option>Like To Have</option>
            <option>Maybe</option>
            <option>Off Limits</option>
          </select>
        </div>
        <div className="inline-block relative w-64">
          <label
            // className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-state-2"
          >
            State
          </label>
          <select
            // className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            id="grid-state-2"
          >
            <option>N/A</option>
            <option>Must Have</option>
            <option>Like To Have</option>
            <option>Maybe</option>
            <option>Off Limits</option>
          </select>
        </div>
      </Form> */}
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
