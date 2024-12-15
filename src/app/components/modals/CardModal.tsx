import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
interface iAppProps {
  id: string;
  nameArabic: string;
  nameEnglish: string;
  departureTime: string;
  arrivalTime: string;
  fromStation: string;
  toStation: string;
  open: boolean;
  onClose: () => void; // Use onClose instead of directly modifying setOpen
}

export default function CardModal({
  id,
  nameArabic,
  nameEnglish,
  arrivalTime,
  departureTime,
  fromStation,
  toStation,
  open,
  onClose,
  
}: iAppProps) {
  return (
    <div>
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] text-lg">
        <DialogHeader>
        <DialogTitle className="text-2xl">Report</DialogTitle>
        <hr />
          <DialogTitle className="text-xl">{nameEnglish}</DialogTitle>
          <DialogDescription className="line-clamp-3 text-md">
            {nameArabic}
          </DialogDescription>
          <DialogDescription className="line-clamp-3 text-md">
            {fromStation} - {toStation}
          </DialogDescription>
          <div className="flex flex-col gap-x-2 items-start mt-4 text-md">
            <p className=" py-0.5 px-1 border-gray-200 text-lg">
              <strong>Departure Time:</strong> {departureTime}
            </p>
            <p className=" py-0.5 px-1 border-gray-200 ">
              <strong>Arrival Time:</strong> {arrivalTime}
            </p>
            <p className="text-sm text-gray-500">Include a Map.</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-yellow-400 transition-all ease-linear delay-75 hover:scale-105" variant='secondary' onClick={() => {}}>Edit</Button>
            <Button variant='secondary' className="bg-rose-500 transition-all ease-linear delay-75 hover:scale-105" onClick={() => {}}>Delete</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  );
}
