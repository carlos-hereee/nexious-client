import { MeetingDetials } from "app-calendar";
import { ItemDetail } from "nexious-library";
import { formatDate } from "@app/stringToCamalCase";

interface Props {
  meeting: MeetingDetials;
}
const MeetingDetails = ({ meeting }: Props) => {
  return (
    <div className="container">
      <h2 className="heading">Event details</h2>
      <ItemDetail label="Event name:" labelLayout="bolden">
        <span>{meeting.name || "No name"}</span>
      </ItemDetail>
      <ItemDetail label="Event details:" labelLayout="bolden">
        <span>{meeting.details || "No details"}</span>
      </ItemDetail>
      <ItemDetail label="Event date:" labelLayout="bolden">
        <span> {formatDate(meeting.date)}</span>
      </ItemDetail>
      <ItemDetail label="Start time:" labelLayout="bolden">
        <span>{meeting.startTime}</span>
      </ItemDetail>
      <ItemDetail label="End time:" labelLayout="bolden">
        <span>{meeting.endTime}</span>
      </ItemDetail>
    </div>
  );
};

export default MeetingDetails;
