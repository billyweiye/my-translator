import Link from 'next/link';
import { Menu } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function DropdownMenu() {
  return (
    <div >
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center text-lg font-mono font-bold text-slate-100 ">
            Products
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 self-center text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute  mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-slate-100 ">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <Link href='https://zaizai.run'
                  className={`${active ? 'bg-sunset text-slate-100 font-mono text-base'  : 'font-mono text-base text-slate-950'
                    } group flex w-full items-center rounded px-2 py-2`}
                >
                  {active ? (
                    <ChatActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <ChatInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Chat
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href='/translator'
                  className={`${active ? 'bg-sunset text-slate-100 font-mono text-base'  : 'font-mono text-base text-slate-950'
                } group flex w-full items-center rounded px-2 py-2`}
                >
                  {active ? (
                    <TranslatorActiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  ) : (
                    <TranslatorInactiveIcon
                      className="mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  )}
                  Translator
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

function ChatInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#FFFFFF"
        stroke="#F2C3A7"
        strokeWidth="2"
      />
    </svg>
  )
}

function ChatActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#F2C3A7"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
    </svg>
  )
}

function TranslatorInactiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#FFFFFF"
        stroke="#F2C3A7"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#FFFFFF"
        stroke="#F2C3A7"
        strokeWidth="2"
      />
    </svg>
  )
}

function TranslatorActiveIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4H12V12H4V4Z"
        fill="#F2C3A7"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path
        d="M8 8H16V16H8V8Z"
        fill="#F2C3A7"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
    </svg>
  )
}

