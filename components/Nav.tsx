"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers/index';

const NAVIGATION_PATH = {
  home: "/",
  create_prompt: "/create-prompt",
  profile: "/profile",
  signInPage: "/api/auth/signin",
}

type ProviderInfo = Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<ProviderInfo>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  function ProvidersListInfo() {
    return (
      <>
      {providers && Object.values(providers).map((provider) =>
        (<button
          key={provider.name}
          type="button"
          onClick={() => signIn(provider.id)}
          className="black_btn">
            Sign In with {provider.name}
        </button>) )
      }
    </>
    )
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={NAVIGATION_PATH.home} className="flex gap-2 flex-center">
        <Image
          className="object-contain"
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        { session?.user ?
          <div className="flex gap-3 md:gap-5">
            <Link href={NAVIGATION_PATH.create_prompt} className="black_btn">Create Post</Link>
            <button type="button" onClick={() => signOut()} className="outline_btn">Sign Out</button>
            <Link href={NAVIGATION_PATH.profile}>
              <Image
                src={session?.user?.image || ""}
                alt="user"
                className="rounded-full"
                width={37}
                height={37}
              />
            </Link>
          </div> :
          <ProvidersListInfo />
        }
      </div>
      
      <div className="sm:hidden flex relative">
        { session?.user  ?
          <div className="flex">
            <Image
              src={session?.user?.image || ""}
              alt="user"
              className="rounded-full"
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prevState) => !prevState)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href={NAVIGATION_PATH.profile}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href={NAVIGATION_PATH.create_prompt}
                    className="dropdown_link"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    >
                      Sign Out
                  </button>
                </div>
              )}
          </div> :
          <ProvidersListInfo />
        }
      </div>
    </nav>
  );
}

export default Nav;
