import DropdownMenu from "./DropdownMenu";

export default function Header() {

    return (
        <div class="flex h-16 items-center justify-between border-b-2 border-b-sunset bg-klein-blue">
            <div class="flex items-center ml-32">
                <img src="logo.jpg" alt="Logo" class="h-8 w-8 mr-2" />
            </div>
            <div class='flex items-center space-x-16'>
                <a href='/' className="px-4 py-2 text-lg font-mono font-bold text-slate-100 ">
                    Home
                </a>
                <div >
                    <DropdownMenu />
                </div>
            </div>
            <a href="#" class="mr-32  text-slate-100 font-mono font-bold">Login</a>

        </div>

    )
};