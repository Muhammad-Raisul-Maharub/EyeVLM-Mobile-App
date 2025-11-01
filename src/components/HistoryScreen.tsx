import { ArrowLeft, Calendar, Filter, Search, Eye } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import type { ScanResult } from '../App';

type HistoryScreenProps = {
  history: ScanResult[];
  onViewItem: (result: ScanResult) => void;
  onBack: () => void;
};

export function HistoryScreen({ history, onViewItem, onBack }: HistoryScreenProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-teal-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-4 rounded-b-[2rem]">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-white">Scan History</h2>
            <p className="text-teal-100">{history.length} scan{history.length !== 1 ? 's' : ''} recorded</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Search scans..."
              className="pl-10 bg-white/95 backdrop-blur border-0 rounded-xl h-11"
            />
          </div>
          <button className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-6 space-y-4 overflow-y-auto">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-6">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-slate-900 mb-2">No Scans Yet</h3>
            <p className="text-slate-600 mb-6 max-w-sm">
              Your scan history will appear here after you complete your first eye screening.
            </p>
            <Button
              onClick={onBack}
              className="rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              Start First Scan
            </Button>
          </div>
        ) : (
          <>
            {/* Group by date - Today, Yesterday, etc. */}
            <div className="space-y-4">
              {history.map((item, index) => (
                <Card 
                  key={item.id}
                  onClick={() => onViewItem(item)}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all bg-white"
                >
                  <div className="flex gap-4">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100">
                      <img 
                        src={item.imageUrl} 
                        alt="Eye scan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-slate-900 truncate">{item.condition}</h3>
                        <Badge className={`${getSeverityColor(item.severity)} border flex-shrink-0`}>
                          {item.confidence}%
                        </Badge>
                      </div>
                      
                      <p className="text-slate-600 line-clamp-2 mb-2">
                        {item.symptoms}
                      </p>
                      
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
