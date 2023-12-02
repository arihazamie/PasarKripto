import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../../components/ui/table";

const LegalTenderApp = () => {
  return (
    <div className="mx-5">
      <div>
        <div className="text-4xl text-MyPurple/70 text-center my-5 font-bold">
          Legal Tender Countries
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableHead></TableHead>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LegalTenderApp;
