import { Head, usePage } from '@inertiajs/react';
import { Calendar, Ticket, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';

interface DashboardProps {
    stats?: {
        totalEvents: number;
        totalUsers: number;
        totalTickets: number;
    } | null;
}

export default function Dashboard({ stats }: DashboardProps) {
    const { auth } = usePage<any>().props;
    const isAdmin = auth.user?.role === 'admin';

    const totalEvents = stats?.totalEvents ?? 0;
    const totalUsers = stats?.totalUsers ?? 0;
    const totalTickets = stats?.totalTickets ?? 0;

    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Admin stats or User Welcome */}

                {isAdmin ? (
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {/* total events card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Total Events</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {totalEvents}
                                </div>
                            </CardContent>
                        </Card>

                        {/* total users card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Total Users</CardTitle>
                                <User className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {totalUsers}
                                </div>
                            </CardContent>
                        </Card>

                        {/* total tickets card */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle>Total Tickets</CardTitle>
                                <Ticket className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {totalTickets}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    // only user see this
                    <div className="flex h-75 items-center justify-center rounded-xl border text-center">
                        <div>
                            <h3 className="mb-2 text-2xl font-bold">Welcome</h3>
                            <p className="text-muted-foreground">
                                You can view and manage your tickets from here.
                            </p>
                        </div>
                    </div>
                )}

                {/* only admin see this */}
                {isAdmin && (
                    <div className="relative flex min-h-75 items-center justify-center rounded-xl border border-sidebar-border/70 text-center">
                        <div>
                            <h3 className="mb-2 text-2xl font-bold">
                                Welcome Back
                            </h3>
                            <p className="text-muted-foreground">
                                Manage your events, users, and tickets from this
                                dashboard
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
