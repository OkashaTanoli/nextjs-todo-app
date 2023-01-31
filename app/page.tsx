import { CreateContext } from '@/store/context'
import styles from './page.module.css'
import Sidebar from '@/components/sidebar/sidebar'
import Panel from '@/components/main_screen/panel'


export default function Home() {
    return (
        <div className={`${styles.main}`}>
            <CreateContext>
                <Sidebar />
                <Panel />
            </CreateContext>
        </div>
    )
}
