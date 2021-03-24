import "../styles/list-item.css";

interface ListItemProps {
  text: string;
}

export const ListItem = ({ text }: ListItemProps) => {
  return <li className="list-item">{text ?? "No entry"}</li>;
};

export default ListItem;
