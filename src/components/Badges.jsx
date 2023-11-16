export default function Badges({stack}){
    return(
        <div>
            {stack.map((item)=>{
               switch(item){
                case "HTML":
                    return <span class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">HTML</span>
                    break;
                case "CSS":
                    return <span class="bg-indigo-100 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">CSS</span>
                    break;
                case "JS":
                    return <span class="bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Javascript</span>
                    break;
                case "React":
                    return <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">React</span>
                    break;
                case "Tailwind":
                    return <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-cyan-600 dark:text-teal-200">Tailwind CSS</span>
                    break;

               }

            })}
        </div>
    )
}