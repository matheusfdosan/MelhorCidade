import Header_homepage from "../../components/Header_homepage"
import Footer_homepage from "../../components/Footer_homepage"
import HowCanHelp from "../../components/HowCanHelp"
import RecentComplaints from "../../components/RecentComplaints"
import RelevantPosts from "../../components/RelevantPosts"

export default function Homepage() {
  return (
    <>
      <Header_homepage />
      <HowCanHelp />
      <RecentComplaints />
      <RelevantPosts />
      <Footer_homepage />
    </>
  )
}
